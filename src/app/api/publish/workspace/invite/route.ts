import { NextRequest, NextResponse } from "next/server";

import jwt from 'jsonwebtoken';

import prisma from "@/lib/prisma";
import { createWorkspaceInviteSchema } from "@/lib/schema";

import InviteUserEmail from "@/emails/invite";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const requestData = await request.json();

  const parsedData = createWorkspaceInviteSchema.safeParse(requestData);

  if (!parsedData.success) {
    return NextResponse.json({ error: 'Validation Error' }, { status: 400 });
  }

  try {
    const publisher = await prisma.publisher.findFirst({
      where: {
        User: {
          email: parsedData.data.email
        }
      },
      include: {
        User: {
          select: {
            email: true,
            first_name: true
          }
        }
      }
    });

    if (!publisher) {
      return NextResponse.json({ error: 'Publisher not found!' }, { status: 404 });
    }

    const workspace = await prisma.workspaces.findFirst({
      where: {
        id: parsedData.data.workspace_id,
        publisher_id: publisher.id
      }
    });

    if (!workspace) {
      return NextResponse.json({ error: 'Workspace not found!' }, { status: 404 });
    }

    const maxInvitesAllowed = await prisma.workspaces.findFirst({
      where: {
        id: workspace.id
      },
      select: {
        max_invites: true
      }
    });

    const totalInvitesGenerated = await prisma.inviteLinks.count({
      where: {
        workspaces_id: workspace.id,
        Publisher: {
          id: publisher.id
        }
      }
    });

    if (maxInvitesAllowed && totalInvitesGenerated >= maxInvitesAllowed.max_invites) {
      return NextResponse.json({ error: 'No more free invites can be created!' }, { status: 400 });
    }

    const result = await prisma.$transaction(async (tx) => {
      try {
        const token = jwt.sign(
          {
            user_email: parsedData.data.user_email,
            workspace_id: parsedData.data.workspace_id
          },
          process.env.GENERATE_INVITE_SECRET || 'dev',
          { expiresIn: '24h' }
        );

        await tx.inviteLinks.create({
          data: {
            unique_link: token,
            publisher_id: publisher.id,
            workspaces_id: workspace.id,
          }
        });

        return { success: true, token };
      } catch (error) {
        console.error('[workspace invite POST tx] ', error);
        throw new Error(`Transaction failed`);
      }
    });

    if (result.success) {
      await resend.emails.send({
        from: 'Central Sync Hub <no-reply@centralsynchub.com>',
        to: [`${parsedData.data.user_email}`],
        subject: 'You have been invited',
        react: InviteUserEmail({
          invitedByEmail: publisher.User.email,
          invitedByUsername: publisher.User.first_name,
          inviteLink: process.env.EMAIL_FROM! + '/invite/' + result.token,
          workspaceName: workspace.name
        }),
      });

      return NextResponse.json({ message: 'Invite Generated!' }, { status: 201 });
    }
  } catch (error) {
    console.error('[GET workspaces] ', error);
    return NextResponse.json({ error: 'Internal Server Error!' }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { publisherSchema } from "@/lib/schema";

export async function GET(request: NextRequest, { params: { user_email } }: { params: { user_email: string } }) {
  const parsedData = publisherSchema.safeParse({
    email: user_email
  });

  if (!parsedData.success) {
    return NextResponse.json({ error: 'Validation Error' }, { status: 400 });
  }

  try {
    const userWorkspaces = await prisma.workspaces.findMany({
      where: {
        Publisher: {
          User: {
            email: parsedData.data.email
          }
        }
      },
      include: {
        post: {
          select: {
            id: true,
            title: true,
            image: true,
            audio: true,
            createdAt: true
          },
          take: 1
        }
      }
    });

    if (userWorkspaces.length === 0) {
      return NextResponse.json({ message: 'No workspaces found!', data: [] }, { status: 200 });
    }

    return NextResponse.json({ message: 'Workspaces found!', data: userWorkspaces }, { status: 200 });
  } catch (error) {
    console.error('[GET workspaces] ', error);
    return NextResponse.json({ error: 'Internal Server Error!' }, { status: 500 });
  }
}

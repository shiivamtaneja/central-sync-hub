import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { createWorkspaceSchema, publisherSchema } from "@/lib/schema";

export async function GET(request: NextRequest) {
  const searchParams = new URLSearchParams(request.nextUrl.searchParams);

  const publisherEmail = searchParams.get('p_id');

  const parsedData = publisherSchema.safeParse({
    email: publisherEmail
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


export async function POST(request: NextRequest) {
  const requestData = await request.json();

  const parsedData = createWorkspaceSchema.safeParse(requestData);

  if (!parsedData.success) {
    return NextResponse.json({ error: 'Validation Error' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: parsedData.data.email
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User Not Found' }, { status: 404 });
    }

    const nameUsed = await prisma.workspaces.findFirst({
      where: {
        Publisher: {
          user_id: user.id
        },
        name: parsedData.data.name
      }
    });

    if (nameUsed) {
      return NextResponse.json({ error: 'Workspace already exits!' }, { status: 409 });
    }

    await prisma.workspaces.create({
      data: {
        name: parsedData.data.name,
        Publisher: {
          connect: {
            user_id: user.id
          }
        }
      }
    });

    return NextResponse.json({ message: 'Workspaces created!' }, { status: 201 });
  } catch (error) {
    console.error('[GET workspaces] ', error);
    return NextResponse.json({ error: 'Internal Server Error!' }, { status: 500 });
  }
}
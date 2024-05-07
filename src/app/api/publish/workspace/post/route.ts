import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { createPostSchema, postSchema } from "@/lib/schema";

export async function GET(request: NextRequest) {
  try {
    const searchParams = new URLSearchParams(request.nextUrl.searchParams);

    const publisherEmail = searchParams.get('p_id');
    const workspaceID = searchParams.get('w_id');

    const parsedData = postSchema.safeParse({
      email: publisherEmail,
      workspace_id: workspaceID
    });

    if (!parsedData.success) {
      return NextResponse.json({ error: 'Validation Error' }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: {
        email: parsedData.data.email
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'Account Not Found!' }, { status: 404 });
    }

    const workspaceDetails = await prisma.workspaces.findFirst({
      where: {
        id: parsedData.data.workspace_id
      }
    });

    const workspacePosts = await prisma.post.findMany({
      where: {
        Workspaces: {
          id: parsedData.data.workspace_id,
        }
      },
      select: {
        id: true,
        audio: true,
        createdAt: true,
        image: true,
        title: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (workspacePosts.length === 0) {
      return NextResponse.json({
        message: 'No Post found!',
        data: [],
        other: {
          workspace_name: workspaceDetails?.name
        }
      }, { status: 200 });
    }

    return NextResponse.json({
      message: 'Posts found!',
      data: workspacePosts,
      other: {
        workspace_name: workspaceDetails?.name
      }
    }, { status: 200 });
  } catch (error) {
    console.error('[create publisher] ', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const requestData = await request.json();

  const parsedData = createPostSchema.safeParse(requestData);

  if (!parsedData.success) {
    return NextResponse.json({ error: 'Validation Error' }, { status: 400 });
  }

  try {
    await prisma.post.create({
      data: {
        audio: parsedData.data.audio,
        image: parsedData.data.image,
        title: parsedData.data.title,
        Workspaces: {
          connect: {
            id: parsedData.data.workspace_id
          }
        }
      }
    });

    return NextResponse.json({ message: 'Post created!' }, { status: 201 });
  } catch (error) {
    console.error('[GET workspaces] ', error);
    return NextResponse.json({ error: 'Internal Server Error!' }, { status: 500 });
  }
}
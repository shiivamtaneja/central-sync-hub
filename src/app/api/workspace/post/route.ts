import prisma from "@/lib/prisma";
import { postSchema } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";

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

    const userSubscribed = await prisma.subscriptions.findFirst({
      where: {
        User: {
          email: parsedData.data.email,
        },
        workspaces_id: parsedData.data.workspace_id
      }
    });

    if (!userSubscribed) {
      return NextResponse.json({ error: 'User not subscribed!' }, { status: 400 });
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
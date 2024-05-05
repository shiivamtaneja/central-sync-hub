import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { createPostSchema } from "@/lib/schema";

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
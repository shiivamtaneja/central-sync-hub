import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { createWorkspaceSchema } from "@/lib/schema";

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
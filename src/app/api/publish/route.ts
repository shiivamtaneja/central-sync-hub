import prisma from "@/lib/prisma";
import { publisherSchema } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();

    const parsedData = publisherSchema.safeParse(requestData);

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

    const existingPublisher = await prisma.publisher.findFirst({
      where: {
        user_id: user.id
      }
    });

    if (existingPublisher) {
      return NextResponse.json({ message: 'Already a publisher!' }, { status: 400 });
    }

    await prisma.publisher.create({
      data: {
        user_id: user.id
      }
    });

    return NextResponse.json({ message: 'Congratulations on becoming a publisher!' }, { status: 201 });
  } catch (error) {
    console.error('[create publisher] ', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
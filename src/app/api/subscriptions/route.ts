import prisma from "@/lib/prisma";
import { publisherSchema } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = new URLSearchParams(request.nextUrl.searchParams);

    const publisherEmail = searchParams.get('p_id');

    const parsedData = publisherSchema.safeParse({
      email: publisherEmail
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

    const userSubscriptions = await prisma.subscriptions.findMany({
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
        },
        Workspaces: {
          include: {
            post: {
              select: {
                audio: true,
                image: true,
                title: true,
                createdAt: true,
                id: true
              },
              take: 1,
              orderBy: {
                createdAt: 'desc'
              }
            }
          }
        }
      }
    });

    if (userSubscriptions.length === 0) {
      return NextResponse.json({ message: 'No Subscriptions found!', data: [] }, { status: 200 });
    }

    return NextResponse.json({ message: 'Subscriptions found!', data: userSubscriptions }, { status: 200 });
  } catch (error) {
    console.error('[create publisher] ', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
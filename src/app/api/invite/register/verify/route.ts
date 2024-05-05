import { NextRequest, NextResponse } from "next/server";

import jwt from 'jsonwebtoken';

import { currTime } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { inviteOtpSchema } from "@/lib/schema";

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();

    const parsedData = inviteOtpSchema.safeParse(requestData);

    if (!parsedData.success) {
      return NextResponse.json({ error: 'Validation Error!' }, { status: 400 });
    }

    const inviteToken = jwt.decode(parsedData.data.token, { json: true });

    if (!inviteToken || (inviteToken.user_email !== parsedData.data.email)) {
      return NextResponse.json({ error: 'Invalid Email!' }, { status: 400 });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        email: parsedData.data.email
      }
    });

    if (!existingUser) {
      return NextResponse.json({ error: 'Account not found!' }, { status: 404 });
    }

    const userToken = await prisma.oTP.findFirst({
      where: {
        user_id: existingUser.id,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (!userToken) {
      return NextResponse.json({ error: 'Token not found!' }, { status: 404 });
    }

    const savedOTP = jwt.decode(userToken.token, { json: true });
    if (!savedOTP || !savedOTP.exp || savedOTP.otp != parsedData.data.otp) {
      return NextResponse.json({ error: 'Invalid OTP!' }, { status: 400 });
    }

    if (savedOTP.exp < currTime) {
      return NextResponse.json({ error: 'OTP Expired!' }, { status: 400 });
    }

    await prisma.user.update({
      where: {
        email: parsedData.data.email
      },
      data: {
        verified: true
      }
    });

    await prisma.subscriptions.create({
      data: {
        workspaces_id: inviteToken.workspace_id,
        user_id: existingUser.id
      }
    });

    return NextResponse.json({ message: 'Verified!' }, { status: 200 });
  } catch (error) {
    console.error('[invite register verify] ', error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
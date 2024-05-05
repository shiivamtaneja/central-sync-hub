// import { AuthEmailTemplate } from "@/lib/EmailTemplates";
import { currTime } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { authOtpSchema } from "@/lib/schema";
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from "next/server";

// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();

    const parsedData = authOtpSchema.safeParse(requestData);

    if (!parsedData.success) {
      return NextResponse.json({ error: 'Validation Error!' }, { status: 400 });
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

    return NextResponse.json({ message: 'Verified!' }, { status: 200 });
  } catch (error) {
    console.error('[register verify] ', error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
import VerifyEmail from "@/emails/email-verify";
import prisma from "@/lib/prisma";
import { authSignUpSchema } from "@/lib/schema";
import { generateOTP } from "@/lib/utils";
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from "next/server";

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();

    const parsedData = authSignUpSchema.safeParse(requestData);

    if (!parsedData.success) {
      return NextResponse.json({ error: 'Validation Error' }, { status: 400 });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        email: parsedData.data.email
      }
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Account already exists! Kindly Login' }, { status: 409 });
    }

    const user = await prisma.user.create({
      data: {
        email: parsedData.data.email,
        first_name: parsedData.data.first_name,
        verified: false
      }
    });

    if (user) {
      const otp = generateOTP();
      const token = jwt.sign(
        { otp },
        process.env.OTP_SECRET || 'dev',
        { expiresIn: '5m' }
      );

      await prisma.oTP.create({
        data: {
          user_id: user.id,
          token
        }
      });

      await resend.emails.send({
        from: 'Central Sync Hub <no-reply@centralsynchub.com>',
        to: [`${user.email}`],
        subject: 'Important: Verify your email',
        react: VerifyEmail({
          verificationCode: otp
        }),
      });

      return NextResponse.json({ message: 'Kindly Verify!' }, { status: 201 });
    }
  } catch (error) {
    console.error('[register] ', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
import VerifyEmail from "@/emails/email-verify";
import { AuthEmailTemplate } from "@/lib/EmailTemplates";
import prisma from "@/lib/prisma";
import { authSignInSchema } from "@/lib/schema";
import { generateOTP } from "@/lib/utils";
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from "next/server";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();

    const parsedData = authSignInSchema.safeParse(requestData);

    if (!parsedData.success) {
      return NextResponse.json({ error: 'Validation Error' }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: {
        email: parsedData.data.email
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not Found!' }, { status: 404 });
    }

    if (!user.verified) {
      return NextResponse.json({ error: 'Account not verified!' }, { status: 400 });
    }

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

    return NextResponse.json({ message: 'Kindly Verify OTP!' }, { status: 200 });
  } catch (error) {
    console.error('[login] ', error);
    return NextResponse.json({ error: 'Internal Server Error!' }, { status: 500 });
  }
}
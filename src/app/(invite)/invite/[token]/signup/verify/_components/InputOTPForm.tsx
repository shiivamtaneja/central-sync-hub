"use client";

import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { inviteOtpSchema } from "@/lib/schema";
import { partialEmail } from "@/lib/utils";
import { emailVerificationStore } from "@/store/emailVerification";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export function InputOTPForm({ email, token }: { email: string, token: string }) {
  const router = useRouter();

  const resetEmail = emailVerificationStore((state) => state.reset);

  const form = useForm<z.infer<typeof inviteOtpSchema>>({
    resolver: zodResolver(inviteOtpSchema),
    defaultValues: {
      otp: "",
      email: email,
      token
    },
  });

  const onSubmit = async (values: z.infer<typeof inviteOtpSchema>) => {
    try {
      const response = await fetch('/api/invite/register/verify', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          otp: values.otp,
          token: values.token
        }),
        credentials: 'include',
      });

      if (response.ok) {
        if (response.status === 200) {
          resetEmail();
          const login = await signIn('credentials', {
            redirect: false,
            email: values.email,
            callbackUrl: '/dashboard'
          });

          if (login) {
            if (login.ok) {
              router.replace('/dashboard');
            }
          }
        }
      } else {
        const error = await response.json();
        form.setError('otp', { message: error.error });
      }

    } catch (error) {
      console.error("Error " + error);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verification Code</FormLabel>
                <FormDescription>Enter the verification code sent to <span className="font-semibold">{partialEmail(email)}</span></FormDescription>
                <FormControl>
                  <InputOTP {...field} maxLength={4}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="bg-blue-500 hover:bg-blue-800">Submit</Button>
        </form>
      </Form>

      <div className="flex items-center text-sm gap-1">
        <p onClick={() => { }} className="text-blue-800 cursor-pointer">Didn&apos;t receive a code? Resend (30)</p>
      </div>
    </>
  );
}

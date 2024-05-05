'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { authSignInSchema } from "@/lib/schema";
import { emailVerificationStore } from "@/store/emailVerification";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const SignIn = () => {
  const router = useRouter();

  const setEmail = emailVerificationStore((state) => state.set);

  const form = useForm<z.infer<typeof authSignInSchema>>({
    resolver: zodResolver(authSignInSchema),
    defaultValues: {
      email: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof authSignInSchema>) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
        }),
        credentials: 'include',
      });

      if (response.ok) {
        if (response.status === 200) {
          setEmail(values.email);

          router.replace('/signin/verify');
        }
      } else {
        const error = await response.json();
        form.setError('email', { message: error.error });
      }

    } catch (error) {
      console.error("Error " + error);
    }
    // try {
    //   const response = await signIn('credentials', {
    //     redirect: false,
    //     email: values.email,
    //     callbackUrl: '/dashboard'
    //   });

    //   if (response) {
    //     if (response.error) {
    //       form.setError('email', { message: response.error });
    //     } else {
    //       router.replace('/dashboard');
    //     }
    //   }

    // } catch (error) {
    //   console.error("Error " + error);
    // }
  };

  return (
    <div className="border rounded-xl p-6 shadow-lg w-96 mx-3 flex flex-col space-y-4">
      <h1 className="flex flex-col gap-2">
        <span className="font-bold text-lg leading-none">Sign in</span>
        <span className="text-sm">to continue to Central Sync Hub</span>
      </h1>
      <div className="border"></div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input placeholder="test@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-blue-500 hover:bg-blue-800">Continue</Button>
        </form>
      </Form>
      <div className="flex items-center text-sm gap-1">
        <p>No account?</p>
        <Link href={'/signup'} className="text-blue-600">Sign up</Link>
      </div>
    </div>
  );
};

export default SignIn;
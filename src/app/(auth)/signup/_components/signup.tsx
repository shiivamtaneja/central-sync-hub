'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { authSignUpSchema } from "@/lib/schema";
import { emailVerificationStore } from "@/store/emailVerification";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const SignUp = () => {
  const router = useRouter();

  const setEmail = emailVerificationStore((state) => state.set);

  const form = useForm<z.infer<typeof authSignUpSchema>>({
    resolver: zodResolver(authSignUpSchema),
    defaultValues: {
      email: '',
      first_name: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof authSignUpSchema>) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          first_name: values.first_name,
        }),
        credentials: 'include',
      });

      if (response.ok) {
        if (response.status === 201) {
          setEmail(values.email);

          router.replace('/signup/verify');
        }
      } else {
        const error = await response.json();
        if (response.status === 409) {
          form.setError('email', { message: error.error });
        } else if (response.status === 400) {
          form.setError('first_name', { message: error.error });
          form.setError('email', { message: error.error });
        }
      }

    } catch (error) {
      console.error("Error " + error);
    }
  };

  return (
    <div className="border rounded-xl p-6 shadow-lg w-96 mx-3 flex flex-col space-y-4">
      <h1 className="flex flex-col gap-2">
        <span className="font-bold text-lg leading-none">Create your account</span>
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
            name="first_name"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Lorem Lipsum" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input placeholder="test@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <Button type="submit" className="bg-blue-500 hover:bg-blue-800">Continue</Button>
        </form>
      </Form>
      <div className="flex items-center text-sm gap-1">
        <p>Have an account?</p>
        <Link href={'/signin'} className="text-blue-600">Sign in</Link>
      </div>
    </div>
  );
};

export default SignUp;
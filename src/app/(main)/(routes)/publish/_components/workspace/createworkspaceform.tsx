'use client';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { createWorkspaceSchema } from '@/lib/schema';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const CreateWorkspaceFrom = ({
  email
}: {
  email: string
}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof createWorkspaceSchema>>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      email,
      name: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof createWorkspaceSchema>) => {
    try {
      const response = await fetch('/api/publish/workspace', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          name: values.name,
        }),
        credentials: 'include',
      });

      if (response.ok) {
        if (response.status === 201) {

          router.push('/publish/workspace/created');
        }
      } else {
        const error = await response.json();
        if (response.status === 409) {
          form.setError('name', { message: error.error });
        }
      }

    } catch (error) {
      console.error("Error " + error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-4'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Lorem Lipsum' />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        >
        </FormField>

        <Button type="submit" className="bg-blue-500 hover:bg-blue-800">Submit</Button>
      </form>
    </Form>
  );
};

export default CreateWorkspaceFrom;
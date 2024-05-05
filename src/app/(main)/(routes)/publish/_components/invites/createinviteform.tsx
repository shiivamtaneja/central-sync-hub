'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { createWorkspaceInviteSchema } from '@/lib/schema';
import { cn } from '@/lib/utils';

import Spinner from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const CreateInviteFrom = ({
  email,
  workspaceId
}: {
  email: string,
  workspaceId: string
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof createWorkspaceInviteSchema>>({
    resolver: zodResolver(createWorkspaceInviteSchema),
    defaultValues: {
      email,
      workspace_id: workspaceId,
      user_email: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof createWorkspaceInviteSchema>) => {
    try {
      setLoading(true);

      const response = await fetch('/api/publish/workspace/invite', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          workspace_id: values.workspace_id,
          user_email: values.user_email
        }),
        credentials: 'include',
      });

      if (response.ok) {
        if (response.status === 201) {

          router.push('/publish/workspace/invite/created');
        }
      } else {
        const errorData = await response.json();
        form.setError('user_email', { message: errorData.error });
      }

    } catch (error) {
      console.error("Error " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          'flex flex-col gap-4',
          loading && 'opacity-50'
        )}
      >
        {loading && <Spinner />}

        <FormField
          control={form.control}
          name='user_email'
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Lorem Lipsum' disabled={loading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        >
        </FormField>

        <Button type="submit" className="bg-blue-500 hover:bg-blue-800 disabled:cursor-not-allowed" disabled={loading}>Invite</Button>
      </form>
    </Form>
  );
};

export default CreateInviteFrom;
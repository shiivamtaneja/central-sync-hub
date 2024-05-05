'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { AudioRecorder } from 'react-audio-voice-recorder';

import { createPostSchema } from '@/lib/schema';
import { cn } from '@/lib/utils';
import { getSignedURl } from './upload-audio';

import Spinner from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const CreatePostFrom = ({
  email,
  workspaceId
}: {
  email: string,
  workspaceId: string
}) => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File>();
  const [audio, setAudio] = useState<Blob>();

  const router = useRouter();

  const form = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      email,
      title: '',
      audio: '1',
      image: '1',
      workspace_id: workspaceId
    }
  });

  const onSubmit = async (values: z.infer<typeof createPostSchema>) => {
    try {
      if (!file || !audio) {
        alert('Missing details');
        return;
      }

      setLoading(true);

      const imageUpload = await getSignedURl();

      await fetch(imageUpload.sucess.url, {
        method: 'PUT',
        body: file,
        headers: {
          "Content-type": file.type
        }
      });

      const audioUpload = await getSignedURl();

      await fetch(audioUpload.sucess.url, {
        method: 'PUT',
        body: audio,
        headers: {
          "Content-type": audio.type
        }
      });

      const response = await fetch('/api/publish/workspace/post', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          title: values.title,
          image: imageUpload.sucess.url.split("?")[0],
          audio: audioUpload.sucess.url.split("?")[0],
          workspace_id: workspaceId,
        }),
        credentials: 'include',
      });

      if (response.ok) {
        if (response.status === 201) {

          router.push('/publish/post/created');
        }
      }
    } catch (error) {
      console.error("Error " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
            name='title'
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Lorem Lipsum' disabled={loading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />

          <Label htmlFor="image">Image</Label>
          <Input
            id="image"
            type="file"
            onChange={(e) => {
              setFile(e.target.files?.[0]);
            }}
            disabled={loading}
          />

          <AudioRecorder
            onRecordingComplete={(blob: Blob) => {
              setAudio(blob);
            }}
            audioTrackConstraints={{
              noiseSuppression: true,
              echoCancellation: true,
              // autoGainControl,
              // channelCount,
              // deviceId,
              // groupId,
              // sampleRate,
              // sampleSize,
            }}
            onNotAllowedOrFound={(err) => console.error('[audio save] ', err)}
            downloadOnSavePress={false}
            downloadFileExtension="mp3"
            mediaRecorderOptions={{
              audioBitsPerSecond: 128000,
            }}
          // showVisualizer={true}
          />

          <Button type="submit" disabled={loading} className="bg-blue-500 hover:bg-blue-800 disabled:cursor-not-allowed">Submit</Button>
        </form>
      </Form>
    </>
  );
};

export default CreatePostFrom;
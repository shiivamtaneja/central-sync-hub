"use server";

import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';

import prisma from '@/lib/prisma';

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!
  }
});

export const deleteWorkspaceAction = async (workspace_id: string) => {
  const post = await prisma.post.findMany({
    where: {
      workspaces_id: workspace_id
    }
  });

  for (const { audio, image } of post) {
    const postImg = image.split("/").pop();
    const postAudio = audio.split("/").pop();

    const deleteImgObjectCommand = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: postImg
    });

    const deleteAudioObjectCommand = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: postAudio
    });

    await s3.send(deleteImgObjectCommand);
    await s3.send(deleteAudioObjectCommand);
  }

  await prisma.workspaces.delete({
    where: {
      id: workspace_id
    }
  });

  return { sucess: true };
};
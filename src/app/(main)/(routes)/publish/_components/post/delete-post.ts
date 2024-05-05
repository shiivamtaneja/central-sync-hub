"use server";

import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';

import prisma from '@/lib/prisma';
import { Post } from '@/types/publish';

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!
  }
});

export const deletePostAction = async (post: Post) => {
  const postImg = post.image.split("/").pop();
  const postAudio = post.audio.split("/").pop();

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

  await prisma.post.delete({
    where: {
      id: post.id
    }
  });

  return { sucess: true };
};
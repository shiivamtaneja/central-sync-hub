'use client';

import { useState } from "react";

import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";

import useQuery from "@/hooks/useQuery";
import { formatDistanceToNow } from "date-fns";

import { Post } from "@/types/publish";

import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronLeft, Trash2 } from "lucide-react";
import CreatePost from "../_components/post/createpost";
import { deletePostAction } from "../_components/post/delete-post";

const WorkspacePosts = ({ params }: { params: { workspace_id: string } }) => {
  const [workspaceId, setWorkspaceId] = useState('');
  const [addPostOpen, setAddPostOpen] = useState(false);
  const [loading, setLoaidng] = useState(false);

  const router = useRouter();

  const { status, data: userData } = useSession();

  const { data } = useQuery<Post[], {
    workspace_name: string
  }>({
    errMsg: 'Error fetching workspaces',
    options: {
      method: 'GET'
    },
    queryFn: `/publish/workspace/post?p_id=${userData?.user.email}&w_id=${params.workspace_id}`,
    status
  });

  const handlePostAdd = (workspace_id: string) => {
    setAddPostOpen(true);
    setWorkspaceId(workspace_id);
  };

  const deletePost = async (post: Post) => {
    setLoaidng(true);
    const confirm = window.confirm('Are you sure you want to delete this post?');

    if (!confirm) {
      setLoaidng(false);
      return;
    }

    const res = await deletePostAction(post);

    if (res.sucess) {
      alert('Post Deleted');
      setLoaidng(false);
      router.push(`/publish/${params.workspace_id}/post/deleted`);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3">

        {!data.data ?
          <>
            <Spinner />
          </> :
          <>
            <div className='flex items-center gap-2 justify-between'>
              <div className="flex flex-col">
                <ChevronLeft className="cursor-pointer" onClick={() => router.back()} />
                <h1 className='text-xl font-bold'>Posts under {data.other?.workspace_name}</h1>
              </div>
              <Button onClick={() => handlePostAdd(params.workspace_id)}>Add Post</Button>
            </div>

            {
              data.data.length === 0 ?
                <div className='flex gap-2 items-center'>
                  <p>No post found!</p>
                </div>
                :
                <div className="flex flex-col gap-3">
                  {data.data.map(({ audio, createdAt, id, image, title }, index) => (
                    <div className='md:w-96 w-full' key={index}>
                      <Card className={cn(
                        'flex flex-col',
                        loading && 'opacity-50 cursor-not-allowed'
                      )}>
                        <CardContent className='py-3 gap-4 flex flex-col'>
                          <div className='flex justify-between items-center'>
                            <h3 className="font-semibold text-lg">{title}</h3>
                            <Button size={'icon'} variant={'ghost'} onClick={() => deletePost({ createdAt, audio, title, id, image })} disabled={loading}>
                              <Trash2 className='h-4 w-4' />
                              <span className='sr-only'>Delete Post</span>
                            </Button>
                          </div>
                          <audio src={audio} controls={true} className='w-full' />
                          <p className=''>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</p>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
            }
          </>
        }
      </div>

      <CreatePost
        addPostOpen={addPostOpen}
        setAddPostOpen={setAddPostOpen}
        email={userData ? userData.user.email : ''}
        workspaceId={workspaceId}
      />
    </>
  );
};

export default WorkspacePosts;
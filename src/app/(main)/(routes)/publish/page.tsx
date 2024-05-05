'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useSession } from 'next-auth/react';

import useQuery from '@/hooks/useQuery';

import { cn } from '@/lib/utils';
import { Post, Workspace } from '@/types/publish';
import { formatDistanceToNow } from 'date-fns';

import Spinner from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ShareIcon, Trash2 } from 'lucide-react';
import CreatePost from './_components/post/createpost';
import CreateWorkspace from './_components/workspace/createworkspace';

import CreateInvite from './_components/invites/createinvite';
import { deletePostAction } from './_components/post/delete-post';
import { deleteWorkspaceAction } from './_components/workspace/delete-workspace';

const PublishPage = () => {
  const [addWorkspaceOpen, setAddWorkspaceOpen] = useState(false);
  const [addPostOpen, setAddPostOpen] = useState(false);
  const [createInviteOpen, setcreateInviteOpen] = useState(false);
  const [workspaceId, setWorkspaceId] = useState('');
  const [loading, setLoaidng] = useState(false);

  const router = useRouter();

  const { status, data: userData } = useSession();

  const { data } = useQuery<Workspace[]>({
    errMsg: 'Error fetching workspaces',
    options: {
      method: 'GET'
    },
    queryFn: `/publish/workspace?p_id=${userData?.user.email}`,
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
      router.push('/publish/post/deleted');
    }
  };

  const deleteWorkspace = async (workspace_id: string) => {
    setLoaidng(true);
    const confirm = window.confirm('Are you sure you want to delete this workspace?');

    if (!confirm) {
      setLoaidng(false);
      return;
    }

    const res = await deleteWorkspaceAction(workspace_id);

    if (res.sucess) {
      alert('Workspace Deleted');
      setLoaidng(false);
      router.push('/publish/workspace/deleted');
    }
  };

  const handleInviteLinkAdd = (workspace_id: string) => {
    setcreateInviteOpen(true);
    setWorkspaceId(workspace_id);
  };

  return (
    <>
      <div className='flex flex-col h-full gap-3'>
        <div className='flex justify-between items-center'>
          <h1 className='text-xl font-bold'>Your Workspaces</h1>

          <Button onClick={() => setAddWorkspaceOpen(true)}>New Workspace</Button>
        </div>

        {!data.data ?
          <>
            <Spinner />
          </>
          :
          <>
            {
              data.data.length === 0 ?
                <div className='flex gap-2 items-center'>
                  <p>No workspaces found!</p>

                  <Button onClick={() => setAddWorkspaceOpen(true)}>Add Now</Button>
                </div>
                :
                <>
                  <div className='flex flex-col space-y-8 pl-2'>
                    {data.data.map(({ name, createdAt, id, post }, index) => (
                      <div className='flex flex-col gap-2' key={index}>
                        <p className='flex gap-2 items-center'>
                          <span>{name}</span>
                          {post.length !== 0 &&
                            <span
                              onClick={() => handlePostAdd(id)}
                              className='flex text-sm text-blue-500 cursor-pointer'
                            >
                              Add Post
                            </span>
                          }
                        </p>
                        <div className='flex items-center gap-4 md:pl-6 pl-2'>
                          {post.length === 0 ?
                            <>
                              <div className='md:w-fit w-full'>
                                <Card className={cn(
                                  'flex flex-col',
                                  loading && 'opacity-50 cursor-not-allowed'
                                )}>
                                  <CardContent className='py-3'>
                                    <div className="flex flex-col gap-4">
                                      <p className="text-gray-500 dark:text-gray-400">
                                        No post yet
                                      </p>
                                      <Button onClick={() => handlePostAdd(id)} disabled={loading}>Add Post</Button>
                                    </div>
                                  </CardContent>
                                  <CardFooter className='flex justify-between items-center'>
                                    <div className='flex items-center gap-2'>
                                      <Button size={'icon'} variant={'ghost'} disabled={loading} onClick={() => handleInviteLinkAdd(id)}>
                                        <ShareIcon className='h-4 w-4' />
                                        <span className='sr-only'>Share</span>
                                      </Button>
                                      <Button size={'icon'} variant={'ghost'} onClick={() => deleteWorkspace(id)} disabled={loading}>
                                        <Trash2 className='h-4 w-4' />
                                        <span className='sr-only'>Delete Workspace</span>
                                      </Button>
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</div>
                                  </CardFooter>
                                </Card>
                              </div>
                            </> :
                            <div className='md:w-96 w-full'>
                              <Card className={cn(
                                'flex flex-col',
                                loading && 'opacity-50 cursor-not-allowed'
                              )}>
                                <CardContent className='py-3 gap-4 flex flex-col'>
                                  <p className=''>Latest Post</p>
                                  <div className="flex flex-col gap-4 border rounded-md p-3">
                                    <div className='flex justify-between items-center'>
                                      <h3 className="font-semibold text-lg">{post[0].title}</h3>
                                      <Button size={'icon'} variant={'ghost'} onClick={() => deletePost(post[0])} disabled={loading}>
                                        <Trash2 className='h-4 w-4' />
                                        <span className='sr-only'>Delete Post</span>
                                      </Button>
                                    </div>
                                    <audio src={post[0].audio} controls={true} className='w-full' />
                                  </div>
                                </CardContent>
                                <CardFooter className='flex justify-between items-center'>
                                  <div className='flex items-center gap-2'>
                                    <Button size={'icon'} variant={'ghost'} disabled={loading} onClick={() => handleInviteLinkAdd(id)}>
                                      <ShareIcon className='h-4 w-4' />
                                      <span className='sr-only'>Share</span>
                                    </Button>
                                    <Button size={'icon'} variant={'ghost'} onClick={() => deleteWorkspace(id)} disabled={loading}>
                                      <Trash2 className='h-4 w-4' />
                                      <span className='sr-only'>Delete Workspace</span>
                                    </Button>
                                  </div>
                                  <div className="text-sm text-gray-500 dark:text-gray-400">{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</div>
                                </CardFooter>
                              </Card>
                            </div>
                          }
                        </div>
                      </div>
                    ))}
                  </div>
                </>
            }
          </>
        }

      </div>

      <CreateWorkspace
        addWorkspaceOpen={addWorkspaceOpen}
        setAddWorkspaceOpen={setAddWorkspaceOpen}
        email={userData ? userData.user.email : ''}
      />

      <CreatePost
        addPostOpen={addPostOpen}
        setAddPostOpen={setAddPostOpen}
        email={userData ? userData.user.email : ''}
        workspaceId={workspaceId}
      />

      <CreateInvite
        createInviteOpen={createInviteOpen}
        setcreateInviteOpen={setcreateInviteOpen}
        email={userData ? userData.user.email : ''}
        workspaceId={workspaceId}
      />
    </>
  );
};

export default PublishPage;
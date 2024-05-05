'use client';

import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";

import useQuery from "@/hooks/useQuery";
import { formatDistanceToNow } from "date-fns";

import { Subscriptions } from "@/types/subscriptions";

import Spinner from "@/components/spinner";
import { Card, CardContent } from "@/components/ui/card";

const DashboardPage = () => {
  const router = useRouter();

  const { status, data: userData } = useSession();

  const { data } = useQuery<Subscriptions[], null>({
    errMsg: 'Error fetching workspaces',
    options: {
      method: 'GET'
    },
    queryFn: `/subscriptions?p_id=${userData?.user.email}`,
    status
  });

  const handleWorkspaceClick = (workspace_id: string) => {
    router.push(`/dashboard/${workspace_id}`);
  };

  return (
    <>
      <div className="flex flex-col h-full gap-3">
        <div className='flex justify-between items-center'>
          <h1 className='text-xl font-bold'>Your Subscriptions</h1>
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
                  <p>No Subscriptions found!</p>
                </div>
                :
                <div className='flex flex-col space-y-8 pl-2'>
                  {data.data.map(({ Workspaces: { id, name, post }, User: { email, first_name } }, index) => (
                    <div className='flex flex-col gap-2' key={index}>
                      <p className='flex gap-2 items-center'>
                        <span className="flex md:gap-2 md:items-center md:flex-row flex-col items-start">
                          <span onClick={() => handleWorkspaceClick(id)} className="cursor-pointer underline underline-offset-2">
                            {name}
                          </span>
                          <span className="hidden md:flex">-</span>
                          <span className="text-sm md:flex hidden">{first_name} {`<${email}>`}</span>
                        </span>
                      </p>
                      <div className='flex items-center gap-4 md:pl-6 pl-2'>
                        {post.length === 0 ?
                          <>
                            <div className='md:w-fit w-full'>
                              <Card className='flex flex-col'>
                                <CardContent className='py-3'>
                                  <div className="flex flex-col gap-4">
                                    <p className="text-gray-500 dark:text-gray-400">
                                      No post yet
                                    </p>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          </> :
                          <div className='md:w-96 w-full'>
                            <Card className='flex flex-col'>
                              <CardContent className='py-3 gap-4 flex flex-col'>
                                <p className=''>Latest Post</p>
                                <div className="flex flex-col gap-4 border rounded-md p-3">
                                  <div className='flex justify-between items-center'>
                                    <h3 className="font-semibold text-lg">{post[0].title}</h3>
                                  </div>
                                  <audio src={post[0].audio} controls={true} className='w-full' />
                                  <p className=''>{formatDistanceToNow(new Date(post[0].createdAt), { addSuffix: true })}</p>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        }
                      </div>
                    </div>
                  ))}
                </div>
            }
          </>
        }
      </div>
    </>
  );
};

export default DashboardPage;
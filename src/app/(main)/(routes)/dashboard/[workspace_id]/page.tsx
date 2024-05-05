'use client';

import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";

import useQuery from "@/hooks/useQuery";
import { formatDistanceToNow } from "date-fns";

import { Post } from "@/types/publish";

import Spinner from "@/components/spinner";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";

const WorkspacePosts = ({ params }: { params: { workspace_id: string } }) => {
  const router = useRouter();

  const { status, data: userData } = useSession();

  const { data } = useQuery<Post[], {
    workspace_name: string
  }>({
    errMsg: 'Error fetching workspaces',
    options: {
      method: 'GET'
    },
    queryFn: `/workspace/post?p_id=${userData?.user.email}&w_id=${params.workspace_id}`,
    status
  });

  return (
    <>
      <div className="flex flex-col gap-3">

        {!data.data ?
          <>
            <Spinner />
          </> :
          <>
            <div className='flex items-center gap-2'>
              <ChevronLeft className="cursor-pointer" onClick={() => router.back()} />
              <h1 className='text-xl font-bold'>Posts under {data.other?.workspace_name}</h1>
            </div>

            {
              data.data.length === 0 ?
                <div className='flex gap-2 items-center'>
                  <p>No post found!</p>
                </div>
                :
                <div className="flex flex-col gap-3">
                  {data.data.map(({ audio, createdAt, title }, index) => (
                    <div className='md:w-96 w-full' key={index}>
                      <Card className='flex flex-col'>
                        <CardContent className='py-3 gap-4 flex flex-col'>
                          <div className='flex justify-between items-center'>
                            <h3 className="font-semibold text-lg">{title}</h3>
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
    </>
  );
};

export default WorkspacePosts;
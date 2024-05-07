import { redirect } from 'next/navigation';

const page = ({ params }: { params: { workspace_id: string } }) => {
  redirect(`/publish/${params.workspace_id}`);
};

export default page;
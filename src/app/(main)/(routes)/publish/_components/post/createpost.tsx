import React from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CreatePostFrom from './createpostform';

const CreatePost = ({
  addPostOpen,
  setAddPostOpen,
  email,
  workspaceId
}: {
  addPostOpen: boolean,
  setAddPostOpen: React.Dispatch<React.SetStateAction<boolean>>,
  email: string,
  workspaceId: string
}) => {
  return (
    <Dialog open={addPostOpen} onOpenChange={setAddPostOpen}>
      <DialogContent className='md:w-full w-full'>
        <DialogHeader>
          <DialogTitle>Add Post</DialogTitle>
        </DialogHeader>

        <CreatePostFrom
          workspaceId={workspaceId}
          email={email}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
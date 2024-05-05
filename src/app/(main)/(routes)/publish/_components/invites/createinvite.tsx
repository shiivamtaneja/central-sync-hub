import React from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CreateInviteFrom from './createinviteform';

const CreateInvite = ({
  createInviteOpen,
  setcreateInviteOpen,
  email,
  workspaceId
}: {
  createInviteOpen: boolean,
  setcreateInviteOpen: React.Dispatch<React.SetStateAction<boolean>>,
  email: string,
  workspaceId: string
}) => {
  return (
    <Dialog open={createInviteOpen} onOpenChange={setcreateInviteOpen}>
      <DialogContent className='md:w-full w-full'>
        <DialogHeader>
          <DialogTitle>Invite</DialogTitle>
        </DialogHeader>

        <CreateInviteFrom
          email={email}
          workspaceId={workspaceId}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateInvite;
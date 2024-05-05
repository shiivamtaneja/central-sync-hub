import React from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CreateWorkspaceFrom from './createworkspaceform';

const CreateWorkspace = ({
  addWorkspaceOpen,
  setAddWorkspaceOpen,
  email
}: {
  addWorkspaceOpen: boolean,
  setAddWorkspaceOpen: React.Dispatch<React.SetStateAction<boolean>>,
  email: string
}) => {
  return (
    <Dialog open={addWorkspaceOpen} onOpenChange={setAddWorkspaceOpen}>
      <DialogContent className='md:w-full w-full'>
        <DialogHeader>
          <DialogTitle>Add Workspace</DialogTitle>
        </DialogHeader>

        <CreateWorkspaceFrom
          email={email}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspace;
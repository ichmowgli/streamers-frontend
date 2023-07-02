import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { BsPlus } from "react-icons/bs";
import AddStreamerForm from "./AddStreamerForm";

const AddStreamerButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <div className="flex flex-row items-center justify-end  gap-3 pb-5">
        <p className="">Add new streamer</p>
        <Dialog.Trigger asChild>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8578E6] hover:bg-[#665DAC]"
          >
            <BsPlus fill="white" className="h-10 w-10" />
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-blackA9 data-[state=open]:animate-overlayShow" />
          <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
            <AddStreamerForm closeDialog={() => setOpen(false)} />
          </Dialog.Content>
        </Dialog.Portal>
      </div>
    </Dialog.Root>
  );
};

export default AddStreamerButton;

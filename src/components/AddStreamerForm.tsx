import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "~/services/utils";
import CheckboxOption from "./CheckboxOption";
import { Platform, useStreamerStore } from "~/services/store";

const platforms = Object.keys(Platform) as Platform[];

const schema = z.object({
  name: z.string().trim().min(1, "Username is required"),
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .min(10, "Description should be at least 10 characters"),
  platforms: z
    .array(
      z.enum([
        Platform.TWITCH,
        Platform.YOUTUBE,
        Platform.KICK,
        Platform.RUMBLE,
        Platform.TIKTOK,
      ])
    )
    .min(1),
});

const AddStreamerForm = ({ closeDialog }: { closeDialog: () => void }) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const { createStreamer } = useStreamerStore();

  const onSubmit = async (data: z.infer<typeof schema>) => {
    console.log("Submitting form with data:", data);
    try {
      const newStreamer = await createStreamer(data);
      console.log("Successfully created new streamer:", newStreamer);
      setTimeout(() => closeDialog(), 100);
    } catch (err) {
      console.error("Failed to create new streamer:", err);
    }
  };

  return (
    <div className="z-2000 mx-auto flex w-full max-w-2xl flex-col gap-8 rounded-xl bg-[#222222] p-8 text-[#f5f5f5]">
      <div>
        <Dialog.Title className="text-lg font-semibold">
          New Streamer
        </Dialog.Title>

        <Dialog.Description className="mt-2 text-sm leading-normal text-gray-400">
          Add new streamer here. Click add when you are done.
        </Dialog.Description>
      </div>

      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/no-explicit-any
        onSubmit={handleSubmit(onSubmit as (arg: any) => void)}
        className="flex flex-col gap-5"
      >
        <label className="flex w-full flex-col gap-2 text-sm" htmlFor="name">
          <span>Username</span>
          <input
            {...register("name")}
            type="text"
            className="h-8 rounded-md bg-[#252525] p-2 text-start shadow focus:outline-none focus:ring-2 focus:ring-[#8578E6]"
            placeholder="Enter username"
            required
          />
          {errors.name && typeof errors.name.message === "string" && (
            <p>{errors.name.message}</p>
          )}
        </label>

        <button
          className={cn(
            "inline-flex items-center rounded-lg bg-[#8578E6] px-4 py-2.5 text-center text-sm text-white hover:bg-[#665DAC]",
            {
              "rounded-b-none": dropdownOpen,
            }
          )}
          type="button"
          onClick={toggleDropdown}
        >
          Set the platform{" "}
          <svg
            className="ml-2 h-4 w-4"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>

        <div className={`z-2000 ${dropdownOpen ? "block" : "hidden"} w-full`}>
          <ul className="space-y-1 p-3 text-sm ">
            {platforms.map((name) => (
              <CheckboxOption key={name} register={register} name={name} />
            ))}
          </ul>
        </div>

        <label
          className="flex w-full flex-col gap-2 text-sm"
          htmlFor="description"
        >
          <span className="text-start">Description</span>

          <textarea
            {...register("description")}
            className="min-h-2/5 h-min resize-none rounded-md border-none bg-[#252525] p-2 text-start shadow focus:border focus:outline-none focus:ring-2 focus:ring-[#8578E6]"
            placeholder="Enter description"
            required
            rows={5}
          />

          {errors.description &&
            typeof errors.description.message === "string" && (
              <p>{errors.description.message}</p>
            )}
        </label>

        <div className="flex flex-row gap-2">
          <Dialog.Close
            type="button"
            className="w-full cursor-pointer items-center justify-center rounded-lg bg-[#252525] p-2 shadow hover:bg-[#777777]"
          >
            Cancel
          </Dialog.Close>
          <input
            type="submit"
            className="w-full cursor-pointer items-center justify-center rounded-lg bg-[#8578E6] p-2 shadow hover:bg-[#665DAC]"
          />
        </div>
      </form>
    </div>
  );
};

export default AddStreamerForm;

/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from "react";
import { BiDislike, BiLike } from "react-icons/bi";
import { useStreamerStore } from "~/services/store";
import { cn } from "~/services/utils";

const LikeDislike = ({ id }: { id: string; like: number; dislike: number }) => {
  const [disabled, setDisabled] = useState(false);

  const { placeVote, reactions, streamers } = useStreamerStore();

  const streamer = streamers?.get(id);

  const handleLike = async () => {
    try {
      await placeVote(id, "UP");
      setDisabled(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDislike = async () => {
    try {
      await placeVote(id, "DOWN");
      setDisabled(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-4 flex flex-row gap-5">
      <div
        className={cn(
          "flex cursor-pointer flex-row items-center gap-2 text-neutral-500 transition duration-300 ease-in-out",
          {
            "text-[#665dac]": reactions.liked.has(id),
            "hover:text-[#665dac]": !reactions.liked.has(id) && !disabled,
          }
        )}
      >
        <p>{streamer?.like}</p>
        <button onClick={() => handleLike()} disabled={disabled}>
          <BiLike size={25} />
        </button>
      </div>
      <div
        className={cn(
          "flex cursor-pointer flex-row items-center gap-2 text-neutral-500 transition  duration-300 ease-in-out",
          {
            "text-red-500": reactions.disliked.has(id),
            "hover:text-red-500": !reactions.disliked.has(id) && !disabled,
          }
        )}
      >
        <p>{streamer?.dislike}</p>
        <button onClick={() => handleDislike()} disabled={disabled}>
          <BiDislike size={25} />
        </button>
      </div>
    </div>
  );
};

export default LikeDislike;

/* eslint-disable @next/next/no-img-element */
import { type Streamer } from "~/services/store";
import LikeDislike from "./LikeDislike";
import PlatformIcon from "./PlatformIcon";
import Link from "next/link";

const StreamerCard = ({ streamer }: { streamer: Streamer }) => {
  const { imageUrl, name, platforms, like, dislike } = streamer;

  return (
    <div className="mx-auto max-w-xs rounded-lg border bg-[#f5f5f5] p-4 text-[#222126] hover:border-4 hover:border-[#8578E6]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <Link href={`/${streamer._id}`}>
        <img className="rounded-lg object-contain" src={imageUrl} alt="Image" />
      </Link>

      <div className="flex flex-col gap-2 p-4">
        <Link href={`/${streamer._id}`}>
          <h3 className="text-xl font-semibold hover:text-[#8578E6]">{name}</h3>
        </Link>

        {/* TODO: refer to platform link (example: https://{platform.link}/streamer.name) */}
        <a className="flex flex-row gap-2 text-[#8578E6]">
          {platforms.map((platform) => (
            <PlatformIcon
              key={`${streamer._id}.platform.${platform}`}
              platform={platform}
            />
          ))}
        </a>
        <LikeDislike like={like} dislike={dislike} id={streamer._id} />
      </div>
    </div>
  );
};

export default StreamerCard;

"use client";
/* eslint-disable @next/next/no-img-element */

import { type NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsArrowLeft } from "react-icons/bs";
import LikeDislike from "~/components/LikeDislike";
import PlatformIcon from "~/components/PlatformIcon";
import { useStreamerStore } from "~/services/store";

const StreamerPage: NextPage = () => {
  const { query } = useRouter();
  const streamerId = query.id as string;

  const { streamers, fetchStreamer, connectToWs } = useStreamerStore();

  connectToWs();

  if (!streamerId) {
    return <p>loading...</p>;
  }

  if (!streamers) {
    void fetchStreamer(streamerId);
    return <p>loading...</p>;
  }

  const streamer = streamers.get(streamerId);

  if (!streamer) {
    return <p>Failed to find streamer...</p>;
  }

  return (
    <>
      <main className="main-content">
        <div className="wrapper">
          <Link href="/">
            <BsArrowLeft fill="#8578E6" size={30} />
          </Link>

          <div className="flex flex-col pt-4 lg:pt-10">
            <h1 className="pb-5 text-center text-xl font-bold md:pb-8 md:text-start md:text-2xl">
              {streamer.name}
            </h1>
            <div className="flex flex-col gap-8 sm:flex-row lg:w-full">
              <img
                src={streamer.imageUrl}
                alt={streamer.name}
                className="w-30 sm:w-50 sm:h-50 h-30 rounded-lg object-contain"
              />

              <div className="flex w-fit flex-col justify-between">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <p className="font-semibold md:text-lg">Streams on:</p>
                    <div className="flex flex-row gap-2 text-[#8578E6]">
                      {streamer.platforms.map((platform) => (
                        <PlatformIcon platform={platform} key={platform} />
                      ))}
                    </div>
                  </div>
                  <p className="">{streamer.description}</p>
                </div>
                <LikeDislike
                  id={streamer._id}
                  like={streamer.like}
                  dislike={streamer.dislike}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default StreamerPage;

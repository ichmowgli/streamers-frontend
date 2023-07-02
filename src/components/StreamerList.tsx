import React, { useEffect } from "react";
import StreamerCard from "../components/StreamerCard";
import { useStreamerStore } from "~/services/store";

const StreamerList = () => {
  const { fetchStreamers, streamerArr } = useStreamerStore();

  useEffect(() => {
    void fetchStreamers();
  }, [fetchStreamers]);

  const arr = streamerArr();

  return (
    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8">
      {arr.length
        ? arr.map((item) => <StreamerCard key={item._id} streamer={item} />)
        : "No streamers"}
    </div>
  );
};

export default StreamerList;

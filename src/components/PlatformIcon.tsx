import React, { type FC } from "react";
import { BsTwitch, BsYoutube } from "react-icons/bs";
import { RiKickLine } from "react-icons/ri";
import { BiLogoTiktok } from "react-icons/bi";
import { type Platform } from "~/services/store";

export const RumbleIcon = () => {
  return (
    <svg width="21" height="21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.165 11.292c.843-.617.843-1.809 0-2.442a19.617 19.617 0 00-3.922-2.308 1.624 1.624 0 00-1.419.053 1.54 1.54 0 00-.536.474 1.462 1.462 0 00-.254.656 18.136 18.136 0 00-.13 4.584c.023.233.104.458.234.656s.308.364.518.485a1.614 1.614 0 001.404.1 18.68 18.68 0 004.105-2.25v-.008zm6.304-4.5a4.617 4.617 0 011.393 3.276 4.614 4.614 0 01-1.376 3.282c-3.23 3.241-7.376 5.509-11.93 6.525a4.859 4.859 0 01-3.422-.425 4.53 4.53 0 01-2.187-2.558C.556 12.559.765 7.659 2.104 3.309A4.491 4.491 0 014.177.66 4.834 4.834 0 017.582.11c4.47.983 8.67 3.5 11.887 6.683z"
        fill="#8578E6"
      />
    </svg>
  );
};

type PlatformIconProps = { platform: Platform };
const PlatformIcon: FC<PlatformIconProps> = ({ platform }) => {
  switch (platform) {
    case "TWITCH":
      return <BsTwitch size={21} />;
    case "YOUTUBE":
      return <BsYoutube size={21} />;
    case "RUMBLE":
      return <RumbleIcon />;
    case "TIKTOK":
      return <BiLogoTiktok size={21} />;
    case "KICK":
      return <RiKickLine size={21} />;
  }
};

export default PlatformIcon;

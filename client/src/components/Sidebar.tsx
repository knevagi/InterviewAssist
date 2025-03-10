import React from "react";
import {
  AiOutlineMessage,
  AiOutlinePlus,
  AiOutlineUser,
  AiOutlineSetting,
} from "react-icons/ai";
import { BiLinkExternal } from "react-icons/bi";
import { FiMessageSquare } from "react-icons/fi";
import { MdLogout } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className="scrollbar-trigger flex h-full w-full flex-1 items-start border border-blue-100 bg-blue-100">
      <nav className="flex h-full flex-1 flex-col space-y-1 p-2">
        <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-blue-100 transition-colors duration-200 text-blue-900 cursor-pointer text-sm mb-1 flex-shrink-0 border border-blue-200">
          <AiOutlinePlus className="h-4 w-4" />
          New chat
        </a>
        <div className="flex-col flex-1 overflow-y-auto border-b border-blue-100">
          <div className="flex flex-col gap-2 pb-2 text-blue-900 text-sm">
            <a className="flex py-3 px-3 items-center gap-3 relative rounded-md hover:bg-blue-50 cursor-pointer break-all hover:pr-4 group">
              <FiMessageSquare className="h-4 w-4" />
              <div className="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative">
                New conversation
                <div className="absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-white group-hover:from-blue-50"></div>
              </div>
            </a>
          </div>
        </div>
        <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-blue-100 transition-colors duration-200 text-blue-900 cursor-pointer text-sm">
          <AiOutlineMessage className="h-4 w-4" />
          Clear conversations
        </a>
        <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-blue-100 transition-colors duration-200 text-blue-900 cursor-pointer text-sm">
          <AiOutlineUser className="h-4 w-4" />
          My plan
        </a>
        <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-blue-100 transition-colors duration-200 text-blue-900 cursor-pointer text-sm">
          <AiOutlineSetting className="h-4 w-4" />
          Settings
        </a>
        <a
          href="https://help.openai.com/en/collections/3742473-chatgpt"
          target="_blank"
          className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-blue-100 transition-colors duration-200 text-blue-900 cursor-pointer text-sm"
        >
          <BiLinkExternal className="h-4 w-4" />
          Get help
        </a>
        <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-blue-100 transition-colors duration-200 text-blue-900 cursor-pointer text-sm">
          <MdLogout className="h-4 w-4" />
          Log out
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;

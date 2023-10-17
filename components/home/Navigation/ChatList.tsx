import { groupByDate } from "@/common/utils";
import { Chat } from "@/types/chat";
import { title } from "process";
import React, { useMemo, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdCheck, MdClose, MdDeleteOutline } from "react-icons/md";
import { PiChatBold, PiTrashBold } from "react-icons/pi";

const ChatList = () => {
  const [selectedItem, setSelectedItem] = useState<Chat | null>();
  const [chatList, setChatList] = useState<Chat[]>([
    {
      id: "1",
      title:
        "Chat 1dafsadfasfsafsafsafsafsafasfasfasfsafasfsdafsafasfasfsafsaddfasfdasf",
      updateTime: Date.now(),
    },
    {
      id: "2",
      title: "Chat 2",
      updateTime: Date.now(),
    },
    {
      id: "3",
      title: "Chat 3",
      updateTime: Date.now(),
    },
    {
      id: "4",
      title: "Chat 4",
      updateTime: Date.now(),
    },
  ]);
  const groupList = useMemo(() => {
    return groupByDate(chatList);
  }, [chatList]);
  return (
    <div className="mt-2 flex flex-1 flex-col">
      <ul>
        {chatList.map((chat) => {
          const selected = selectedItem?.id === chat.id;
          return (
            <li
              onClick={() => setSelectedItem(chat)}
              key={chat.id}
              className={`group flex cursor-pointer items-center space-x-3 rounded p-3 hover:bg-gray-800 ${
                selected ? "bg-gray-800" : " "
              }`}
            >
              <div>
                <PiChatBold />
              </div>
              <div className="relative flex-1 overflow-hidden whitespace-nowrap">
                {chat.title}
                <span
                  className={`absolute inset-y-0 right-0 w-8 bg-gradient-to-l  to-transparent group-hover:from-gray-800
                  ${selected ? "from-gray-800" : "from-gray-900"}
                `}
                ></span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChatList;

import { groupByDate } from "@/common/utils";
import { Chat } from "@/types/chat";
import React, { useEffect, useMemo, useState } from "react";
import ChatItem from "./ChatItem";
import {
  useEventBusContext,
  EventListener,
} from "@/components/EventBusContext";

const ChatList = () => {
  const [selectedItem, setSelectedItem] = useState<Chat | null>();
  const [chatList, setChatList] = useState<Chat[]>([
    {
      id: "1",
      title: "How to create a robust react project using next.js",
      updateTime: 2666012800000,
    },
    {
      id: "2",
      title: "How to create a scalable react project using next.js",
      updateTime: 2665590400000,
    },
    {
      id: "3",
      title: "How to create a high-performance react project using next.js",
      updateTime: 2663574400000,
    },
    {
      id: "4",
      title: "How to create a secure react project using next.js",
      updateTime: 2666012800000,
    },
    {
      id: "5",
      title: "How to create a reliable react project using next.js",
      updateTime: 1665504000000,
    },
    {
      id: "6",
      title: "How to create a mobile-first react project using next.js",
      updateTime: 1663411200000,
    },
    {
      id: "7",
      title: "How to create a cloud-based react project using next.js",
      updateTime: 2666012800000,
    },
    {
      id: "8",
      title: "How to create an enterprise-level react project using next.js",
      updateTime: 1665417600000,
    },
    {
      id: "9",
      title: "How to create a responsive react project using next.js",
      updateTime: 1663248000000,
    },
    {
      id: "10",
      title: "How to create a real-time react project using next.js",
      updateTime: 1666012800000,
    },
    {
      id: "11",
      title: "How to create a user-friendly react project using next.js",
      updateTime: 1665331200000,
    },
    {
      id: "12",
      title: "How to create an accessible react project using next.js",
      updateTime: 1663084800000,
    },
    {
      id: "13",
      title: "How to create a cross-platform react project using next.js",
      updateTime: 1666012800000,
    },
    {
      id: "14",
      title: "How to create a modular react project using next.js",
      updateTime: 1665244800000,
    },
    {
      id: "15",
      title: "How to create a test-driven react project using next.js",
      updateTime: 1662998400000,
    },
  ]);
  const groupList = useMemo(() => {
    return groupByDate(chatList);
  }, [chatList]);
  const { subscribe, unsubscribe } = useEventBusContext();
  useEffect(() => {
    const callback: EventListener = () => {
      console.log("fetchChatList");
    };
    subscribe("fetchChatList", callback);

    return () => {
      unsubscribe("fetchChatList", callback);
    };
  }, []);

  return (
    <div className="mb-[48px] mt-2 flex flex-1 flex-col overflow-y-auto">
      {groupList.map(([date, list]) => {
        return (
          <div key={date}>
            <div className="sticky top-0 z-10 border-b border-b-slate-50 bg-[#E0ECE4] p-3 text-sm text-gray-500 dark:bg-gray-700">
              {date}
            </div>
            <ul>
              {list.map((chat) => {
                const selected = selectedItem?.id === chat.id;
                return (
                  <ChatItem
                    key={chat.id}
                    chat={chat}
                    selected={selected}
                    onSelected={(chat) => setSelectedItem(chat)}
                  />
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default ChatList;

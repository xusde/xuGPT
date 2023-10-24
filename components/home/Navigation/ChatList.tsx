import { groupByDate } from "@/common/utils";
import { Chat } from "@/types/chat";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ChatItem from "./ChatItem";
import {
  useEventBusContext,
  EventListener,
} from "@/components/EventBusContext";
import { useAppContext } from "@/components/AppContext";
import { ActionType } from "@/reducers/AppReducer";

const ChatList = () => {
  const {
    state: { selectedChat: selectedItem },
    dispatch,
  } = useAppContext();
  const [chatList, setChatList] = useState<Chat[]>([]);
  const pageRef = useRef(1);
  const loadMoreRef = useRef(null);
  const hasMoreRef = useRef(false);
  const isLoadingRef = useRef(false);

  const groupList = useMemo(() => {
    return groupByDate(chatList);
  }, [chatList]);

  async function getData() {
    if (isLoadingRef.current) {
      return;
    }
    isLoadingRef.current = true;
    const response = await fetch(`/api/chat/list?page=${pageRef.current}`, {
      method: "GET",
    });
    if (!response.ok) {
      console.log(response.statusText);
      isLoadingRef.current = false;
      return;
    }
    pageRef.current += 1;
    const { data } = await response.json();
    hasMoreRef.current = data.hasMore;
    if (pageRef.current === 1) {
      setChatList(data.list);
    } else {
      setChatList((list) => list.concat(data.list));
    }
    isLoadingRef.current = false;
  }
  const { subscribe, unsubscribe } = useEventBusContext();
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    const callback: EventListener = () => {
      pageRef.current = 1;
      getData();
    };
    subscribe("fetchChatList", callback);

    return () => {
      unsubscribe("fetchChatList", callback);
    };
  }, []);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    const div = loadMoreRef.current;
    if (div) {
      observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreRef.current) {
          getData();
        }
      });
      observer.observe(div);
    }

    return () => {
      if (observer && div) {
        observer.unobserve(div);
      }
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
                    onSelected={(chat) => {
                      dispatch({
                        type: ActionType.UPDATE,
                        field: "selectedChat",
                        value: chat,
                      });
                    }}
                  />
                );
              })}
            </ul>
          </div>
        );
      })}
      <div ref={loadMoreRef}>&nbsp;</div>
    </div>
  );
};

export default ChatList;

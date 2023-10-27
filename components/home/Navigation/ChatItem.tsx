import { Chat } from "@/types/chat";
import React, { useEffect, useState } from "react";
import { PiChatBold, PiTrashBold } from "react-icons/pi";
import { AiOutlineEdit } from "react-icons/ai";
import { MdCheck, MdClose, MdDeleteOutline } from "react-icons/md";
import { useEventBusContext } from "@/components/EventBusContext";
import { useAppContext } from "@/components/AppContext";
import { ActionType } from "@/reducers/AppReducer";

type Props = {
  chat: Chat;
  selected: boolean;
  onSelected: (chat: Chat) => void;
};

const ChatItem = ({ chat, selected, onSelected }: Props) => {
  // local states
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [title, setTitle] = useState(chat.title);
  const { publish } = useEventBusContext();
  const { dispatch } = useAppContext();
  // local functions
  const updateChat = async () => {
    const resp = await fetch("/api/chat/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: chat.id, title }),
    });
    if (!resp.ok) {
      console.log(resp.statusText);
    }
    const { code } = await resp.json();
    if (code === 0) {
      publish("fetchChatList");
    }
  };
  const deleteChat = async () => {
    const resp = await fetch(`api/chat/delete?id=${chat.id}`, {
      method: "DELETE",
    });
    if (!resp.ok) {
      console.log(resp.statusText);
    }
    const { code } = await resp.json();
    if (code === 0) {
      publish("fetchChatList");
      dispatch({ type: ActionType.UPDATE, field: "seletecChat", value: null });
    }
  };

  // useEffect
  useEffect(() => {
    setDeleting(false);
    setEditing(false);
  }, [selected]);
  return (
    <li
      onClick={() => onSelected(chat)}
      key={chat.id}
      className={`group relative flex cursor-pointer items-center space-x-3 rounded p-3 hover:bg-[#DCFCE7] hover:dark:bg-gray-800 ${
        selected ? " bg-[#DCFCE7] pr-[4rem] dark:bg-gray-800" : " "
      }`}
    >
      <div>{deleting ? <PiTrashBold /> : <PiChatBold />}</div>

      {editing ? (
        <input
          autoFocus
          className="min-w-0 flex-1 bg-transparent outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      ) : (
        <div className="relative flex-1 overflow-hidden whitespace-nowrap">
          {chat.title}
        </div>
      )}

      {selected && (
        <div className="absolute right-1 flex">
          {editing || deleting ? (
            <>
              <button
                onClick={(e) => {
                  if (deleting) {
                    deleteChat();
                  } else {
                    updateChat();
                  }
                  setDeleting(false);
                  setEditing(false);
                  e.stopPropagation();
                }}
                className="p-1 hover:text-white"
              >
                <MdCheck />
              </button>
              <button
                onClick={(e) => {
                  setDeleting(false);

                  setEditing(false);
                  e.stopPropagation();
                }}
                className="p-1 hover:text-white"
              >
                <MdClose />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={(e) => {
                  setEditing(true);
                  e.stopPropagation();
                }}
                className="p-1 hover:text-white"
              >
                <AiOutlineEdit />
              </button>
              <button
                onClick={() => setDeleting(true)}
                className="p-1 hover:text-white"
              >
                <MdDeleteOutline />
              </button>
            </>
          )}
        </div>
      )}
    </li>
  );
};

export default ChatItem;

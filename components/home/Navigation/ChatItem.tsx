import { Chat } from "@/types/chat";
import React, { useEffect, useState } from "react";
import { PiChatBold, PiTrashBold } from "react-icons/pi";
import { AiOutlineEdit } from "react-icons/ai";
import { MdCheck, MdClose, MdDeleteOutline } from "react-icons/md";

type Props = {
  chat: Chat;
  selected: boolean;
  onSelected: (chat: Chat) => void;
};

const ChatItem = ({ chat, selected, onSelected }: Props) => {
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
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
          value={chat.title}
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

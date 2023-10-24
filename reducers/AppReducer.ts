import { Chat, Message } from "@/types/chat";

export type State = {
  displayNav: boolean;
  theme: "dark" | "light";
  currentModel: string;
  messageList: Message[];
  streamingId: string;
  selectedChat?: Chat;
};

/** Action Types */
export enum ActionType {
  UPDATE = "UPDATE",
  ADD_MSG = "ADD_MSG",
  UPDATE_MSG = "UPDATE_MSG",
  REMOVE_MSG = "REMOVE_MSG",
}

type MessageAction = {
  type: ActionType.ADD_MSG | ActionType.UPDATE_MSG | ActionType.REMOVE_MSG;
  message: Message;
};

type UpdateAction = {
  type: ActionType.UPDATE;
  field: string;
  value: any;
};

export type Action = UpdateAction | MessageAction;

export const initialState: State = {
  displayNav: true,
  theme: "light",
  currentModel: "gpt-3.5-turbo",
  messageList: [],
  streamingId: "",
};

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case ActionType.UPDATE:
      return { ...state, [action.field]: action.value };

    case ActionType.ADD_MSG: {
      const messageList = state.messageList.concat([action.message]);
      return { ...state, messageList };
    }
    case ActionType.UPDATE_MSG: {
      const messageList = state.messageList.map((item) => {
        if (item.id === action.message.id) {
          return action.message;
        }
        return item;
      });
      return { ...state, messageList };
    }
    case ActionType.REMOVE_MSG: {
      const messageList = state.messageList.filter((item) => {
        return item.id !== action.message.id;
      });
      return { ...state, messageList };
    }
    default:
      throw new Error("Invalid action type");
  }
}

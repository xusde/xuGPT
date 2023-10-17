export type State = {
  displayNav: boolean;
  theme: "dark" | "light";
};

export enum ActionType {
  UPDATE = "UPDATE",
}

type UpdateAction = {
  type: ActionType.UPDATE;
  field: string;
  value: any;
};

export type Action = UpdateAction;

export const initialState: State = {
  displayNav: true,
  theme: "light",
};

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case ActionType.UPDATE:
      return { ...state, [action.field]: action.value };
    default:
      throw new Error("Invalid action type");
  }
}

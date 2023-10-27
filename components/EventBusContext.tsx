"use client";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type EventListener = (data?: any) => void;

type EventBusContextProps = {
  subscribe: (event: string, callback: EventListener) => void;
  unsubscribe: (event: string, callback: EventListener) => void;
  publish: (event: string, data?: any) => void;
};

const EventBusContext = createContext<EventBusContextProps>(null!);

export function useEventBusContext() {
  return useContext(EventBusContext);
}

export default function EventBusContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [listeners, setListeners] = useState<Record<string, EventListener[]>>(
    {}
  );
  // subscribe
  const subscribe = useCallback(
    (event: string, callback: EventListener) => {
      if (!listeners[event]) {
        listeners[event] = [];
      }
      listeners[event].push(callback);
      setListeners({ ...listeners });
    },
    [listeners]
  );
  // unsubscribe
  const unsubscribe = useCallback(
    (event: string, callback: EventListener) => {
      if (listeners[event]) {
        listeners[event].filter((cb) => cb !== callback);
        setListeners({ ...listeners });
      }
    },
    [listeners]
  );
  //   publish
  const publish = useCallback(
    (event: string, data: any) => {
      if (listeners[event]) {
        listeners[event].forEach((cb) => cb(data));
      }
    },
    [listeners]
  );
  // context val
  const contextVal = useMemo(
    () => ({ subscribe, unsubscribe, publish }),
    [subscribe, unsubscribe, publish]
  );

  return (
    <EventBusContext.Provider value={contextVal}>
      {children}
    </EventBusContext.Provider>
  );
}

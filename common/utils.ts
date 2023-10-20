import { Chat } from "@/types/chat";

export function groupByDate(chatList: Chat[]) {
  const groupMap = new Map<string, Chat[]>();
  chatList.forEach((item) => {
    const now = new Date();
    const updateTime = new Date(item.updateTime);
    let key = "unknown date";
    const dayDiff = Math.floor(
      (now.getTime() - updateTime.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (dayDiff === 0 && now.getDate() === updateTime.getDate()) {
      key = "Today";
    } else if (dayDiff <= 7) {
      key = "Last 7 days";
    } else if (dayDiff <= 31) {
      key = "Last month";
    } else if (now.getFullYear() === updateTime.getFullYear()) {
      key = `${updateTime.getMonth() + 1} Months ago`;
    } else {
      key = `${updateTime.getFullYear()}`;
    }
    if (groupMap.has(key)) {
      groupMap.get(key)?.push(item);
    } else {
      groupMap.set(key, [item]);
    }
  });
  groupMap.forEach((item) => {
    item.sort((a, b) => b.updateTime - a.updateTime);
  });
  const groupList = Array.from(groupMap).sort(([, list1], [, list2]) => {
    return (
      list2[list2.length - 1].updateTime - list1[list1.length - 1].updateTime
    );
  });
  return groupList;
}

// sleep for a while
export function sleeps(time: number) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve("time is up");
    }, time)
  );
}

import { padStart } from "./string";

export const formatTime = (totalSeconds: number): string => {
  const hour = padStart(Math.floor(totalSeconds / 3600).toString());
  const minute = padStart(Math.floor((totalSeconds % 3600) / 60).toString());
  const second = (totalSeconds % 60).toString();

  if (hour === "00") {
    if (minute === "00") {
      return second;
    }
    return `${minute}:${padStart(second)}`;
  }
  return `${hour}:${minute}:${padStart(second)}`;
};

import { atom } from "recoil";

export interface Player {
  name: string;
  time: number;
  order: number;
}

export const generateDefaultPlayer = (order: number): Player => ({
  name: `Player ${order + 1}`,
  time: 60,
  order,
});

export const playerState = atom<Player[]>({
  key: "playerState",
  default: Array.from({ length: 4 }, (_, i) => generateDefaultPlayer(i)),
});

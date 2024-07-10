import { atom } from "recoil";
import uuid from "react-native-uuid";

export interface Player {
  id: ReturnType<typeof uuid.v4>;
  name: string;
  time: number;
  move: number;
  order: number;
}

export const generateDefaultPlayer = (order: number): Player => ({
  id: uuid.v4(),
  name: `Player${order + 1}`,
  time: 60,
  move: 0,
  order,
});

export const refreshPlayers = (players: Player[]): Player[] => {
  return players.map((player) => ({
    ...player,
    id: uuid.v4(),
  }));
};

export const playerState = atom<Player[]>({
  key: "playerState",
  default: Array.from({ length: 4 }, (_, i) => generateDefaultPlayer(i)),
});

export const settingPlayerState = atom<Player[]>({
  key: "settingPlayerState",
  default: Array.from({ length: 4 }, (_, i) => generateDefaultPlayer(i)),
});

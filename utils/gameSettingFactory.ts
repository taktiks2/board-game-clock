import { randomUUID } from "expo-crypto";
import { Player, GameSetting } from "./types";

export const generateDefaultPlayer = (order: number): Player => ({
  id: randomUUID(),
  name: `Player${order + 1}`,
  time: 60,
  move: 0,
  order,
});

export const refreshPlayers = (players: Player[]): Player[] => {
  return players.map((player) => ({
    ...player,
    id: randomUUID(),
  }));
};

export const generateGameSetting = (playerCount: number): GameSetting => ({
  id: randomUUID(),
  name: `For ${playerCount} players`,
  playerCount,
  players: Array.from({ length: playerCount }, (_, i) =>
    generateDefaultPlayer(i),
  ),
  isKeepAwake: true,
  isAudioOn: true,
  gameMode: "normal",
});

export const generateInitialGameSettings = (): GameSetting[] => {
  return Array.from({ length: 3 }, (_, i) => generateGameSetting(i + 2));
};

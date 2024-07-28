import { atom } from "recoil";
import uuid from "react-native-uuid";
import { Player, GameSetting } from "@/utils/types";

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

export const generateGameSetting = (playerCount: number): GameSetting => {
  return {
    id: uuid.v4(),
    name: `For ${playerCount} players`,
    playerCount,
    players: Array.from({ length: playerCount }, (_, i) =>
      generateDefaultPlayer(i),
    ),
    isKeepAwake: true,
    isAudioOn: true,
    gameMode: "normal",
  };
};

export const generateInitialGameSettings = (): GameSetting[] => {
  return Array.from({ length: 3 }, (_, i) => generateGameSetting(i + 2));
};

export const gameSettingState = atom<GameSetting>({
  key: "gameSettingState",
  default: generateGameSetting(2),
});

export const gameSettingsState = atom<GameSetting[]>({
  key: "gameSettingsState",
  default: generateInitialGameSettings(),
});

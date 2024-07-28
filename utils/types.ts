import uuid from "react-native-uuid";

type GameMode = "normal" | "countDown";

export interface GameSetting {
  id: ReturnType<typeof uuid.v4>;
  name: string;
  playerCount: number;
  players: Player[];
  isKeepAwake: boolean;
  isAudioOn: boolean;
  gameMode: GameMode;
}

export interface Player {
  id: ReturnType<typeof uuid.v4>;
  name: string;
  time: number;
  move: number;
  order: number;
}

export type GameMode = "normal" | "countDown";

export interface Player {
  id: string;
  name: string;
  time: number;
  move: number;
  order: number;
}

export interface GameSetting {
  id: string;
  name: string;
  playerCount: number;
  players: Player[];
  isKeepAwake: boolean;
  isAudioOn: boolean;
  gameMode: GameMode;
}

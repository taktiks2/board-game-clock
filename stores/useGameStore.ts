import { create } from "zustand";
import { GameSetting } from "@/utils/types";
import {
  generateGameSetting,
  generateInitialGameSettings,
  refreshPlayers,
} from "@/utils/gameSettingFactory";
import {
  getGameSettings,
  setGameSettings,
} from "@/utils/asyncStorage";

interface GameState {
  currentSetting: GameSetting;
  allSettings: GameSetting[];
  isInitialized: boolean;
  initialize: () => Promise<void>;
  selectSetting: (index: number) => void;
  addSetting: (setting: GameSetting) => Promise<void>;
  updateSetting: (setting: GameSetting) => Promise<void>;
  deleteSetting: (id: string) => Promise<void>;
  resetPlayers: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  currentSetting: generateGameSetting(2),
  allSettings: [],
  isInitialized: false,

  initialize: async () => {
    const stored = await getGameSettings();
    if (stored && stored.length > 0) {
      set({
        allSettings: stored,
        currentSetting: stored[0],
        isInitialized: true,
      });
    } else {
      const initial = generateInitialGameSettings();
      await setGameSettings(initial);
      set({
        allSettings: initial,
        currentSetting: initial[0],
        isInitialized: true,
      });
    }
  },

  selectSetting: (index: number) => {
    const { allSettings } = get();
    if (index >= 0 && index < allSettings.length) {
      set({ currentSetting: allSettings[index] });
    }
  },

  addSetting: async (setting: GameSetting) => {
    const { allSettings } = get();
    const updated = [setting, ...allSettings];
    set({ allSettings: updated });
    await setGameSettings(updated);
  },

  updateSetting: async (setting: GameSetting) => {
    const { allSettings } = get();
    const updated = allSettings.map((s) =>
      s.id === setting.id ? setting : s,
    );
    set({ allSettings: updated });
    await setGameSettings(updated);
  },

  deleteSetting: async (id: string) => {
    const { allSettings } = get();
    const updated = allSettings.filter((s) => s.id !== id);
    set({ allSettings: updated });
    await setGameSettings(updated);
  },

  resetPlayers: () => {
    const { currentSetting } = get();
    set({
      currentSetting: {
        ...currentSetting,
        players: refreshPlayers(currentSetting.players),
      },
    });
  },
}));

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGameStore } from "../useGameStore";
import { generateGameSetting } from "../../utils/gameSettingFactory";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

const mockGetItem = AsyncStorage.getItem as jest.Mock;
const mockSetItem = AsyncStorage.setItem as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
  useGameStore.setState({
    currentSetting: generateGameSetting(2),
    allSettings: [],
    isInitialized: false,
  });
});

describe("useGameStore", () => {
  describe("initialize", () => {
    it("loads settings from storage when available", async () => {
      const settings = [generateGameSetting(3)];
      mockGetItem.mockResolvedValue(JSON.stringify(settings));

      await useGameStore.getState().initialize();

      const state = useGameStore.getState();
      expect(state.isInitialized).toBe(true);
      expect(state.allSettings).toEqual(settings);
      expect(state.currentSetting).toEqual(settings[0]);
    });

    it("generates initial settings when storage is empty", async () => {
      mockGetItem.mockResolvedValue(null);

      await useGameStore.getState().initialize();

      const state = useGameStore.getState();
      expect(state.isInitialized).toBe(true);
      expect(state.allSettings).toHaveLength(3);
      expect(state.allSettings[0].playerCount).toBe(2);
      expect(state.allSettings[1].playerCount).toBe(3);
      expect(state.allSettings[2].playerCount).toBe(4);
      expect(mockSetItem).toHaveBeenCalled();
    });
  });

  describe("selectSetting", () => {
    it("sets current setting by index", async () => {
      const settings = [generateGameSetting(2), generateGameSetting(3)];
      useGameStore.setState({ allSettings: settings });

      useGameStore.getState().selectSetting(1);

      expect(useGameStore.getState().currentSetting).toEqual(settings[1]);
    });
  });

  describe("addSetting", () => {
    it("adds setting to beginning and saves to storage", async () => {
      const existing = [generateGameSetting(2)];
      useGameStore.setState({ allSettings: existing });

      const newSetting = generateGameSetting(4);
      await useGameStore.getState().addSetting(newSetting);

      const state = useGameStore.getState();
      expect(state.allSettings).toHaveLength(2);
      expect(state.allSettings[0]).toEqual(newSetting);
      expect(mockSetItem).toHaveBeenCalled();
    });
  });

  describe("updateSetting", () => {
    it("updates existing setting and saves to storage", async () => {
      const settings = [generateGameSetting(2), generateGameSetting(3)];
      useGameStore.setState({ allSettings: settings });

      const updated = { ...settings[0], name: "Updated" };
      await useGameStore.getState().updateSetting(updated);

      const state = useGameStore.getState();
      expect(state.allSettings[0].name).toBe("Updated");
      expect(mockSetItem).toHaveBeenCalled();
    });
  });

  describe("deleteSetting", () => {
    it("removes setting by id and saves to storage", async () => {
      const settings = [generateGameSetting(2), generateGameSetting(3)];
      useGameStore.setState({ allSettings: settings });

      await useGameStore.getState().deleteSetting(settings[0].id);

      const state = useGameStore.getState();
      expect(state.allSettings).toHaveLength(1);
      expect(state.allSettings[0].id).toBe(settings[1].id);
      expect(mockSetItem).toHaveBeenCalled();
    });
  });

  describe("resetPlayers", () => {
    it("refreshes player ids in current setting", () => {
      const setting = generateGameSetting(2);
      const originalIds = setting.players.map((p) => p.id);
      useGameStore.setState({ currentSetting: setting });

      useGameStore.getState().resetPlayers();

      const state = useGameStore.getState();
      state.currentSetting.players.forEach((player, i) => {
        expect(player.id).not.toBe(originalIds[i]);
        expect(player.name).toBe(setting.players[i].name);
      });
    });
  });
});

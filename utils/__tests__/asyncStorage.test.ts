import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getGameSettings,
  setGameSettings,
  deleteGameSetting,
} from "../asyncStorage";
import { generateGameSetting } from "../gameSettingFactory";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

const mockGetItem = AsyncStorage.getItem as jest.Mock;
const mockSetItem = AsyncStorage.setItem as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("getGameSettings", () => {
  it("returns parsed settings when data exists", async () => {
    const settings = [generateGameSetting(2)];
    mockGetItem.mockResolvedValue(JSON.stringify(settings));

    const result = await getGameSettings();
    expect(result).toEqual(settings);
    expect(mockGetItem).toHaveBeenCalledWith("gameSettings");
  });

  it("returns null when no data", async () => {
    mockGetItem.mockResolvedValue(null);
    const result = await getGameSettings();
    expect(result).toBeNull();
  });
});

describe("setGameSettings", () => {
  it("stores settings as JSON", async () => {
    const settings = [generateGameSetting(2)];
    await setGameSettings(settings);
    expect(mockSetItem).toHaveBeenCalledWith(
      "gameSettings",
      JSON.stringify(settings),
    );
  });
});

describe("deleteGameSetting", () => {
  it("removes setting by id and saves remaining", async () => {
    const settings = [generateGameSetting(2), generateGameSetting(3)];
    mockGetItem.mockResolvedValue(JSON.stringify(settings));

    await deleteGameSetting(settings[0].id);

    expect(mockSetItem).toHaveBeenCalledWith(
      "gameSettings",
      JSON.stringify([settings[1]]),
    );
  });

  it("does nothing when no data exists", async () => {
    mockGetItem.mockResolvedValue(null);
    await deleteGameSetting("some-id");
    expect(mockSetItem).not.toHaveBeenCalled();
  });
});

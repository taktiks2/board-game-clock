import AsyncStorage from "@react-native-async-storage/async-storage";
import { GameSetting } from "./types";

const STORAGE_KEY = "gameSettings";

export async function getGameSettings(): Promise<GameSetting[] | null> {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEY);
    return value ? JSON.parse(value) : null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function setGameSettings(value: GameSetting[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch (e) {
    console.error(e);
  }
}

export async function deleteGameSetting(id: string): Promise<void> {
  try {
    const settings = await getGameSettings();
    if (settings) {
      const filtered = settings.filter((s) => s.id !== id);
      await setGameSettings(filtered);
    }
  } catch (e) {
    console.error(e);
  }
}

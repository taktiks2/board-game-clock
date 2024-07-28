import { default as AS } from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { GameSetting } from "@/utils/types";

class AsyncStorage {
  async getGameSettings(): Promise<GameSetting[] | null> {
    try {
      const value = await AS.getItem("gameSettings");
      return value ? JSON.parse(value) : null;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async setGameSettings(value: GameSetting[]) {
    try {
      const jsonValue = JSON.stringify(value);
      await AS.setItem("gameSettings", jsonValue);
    } catch (e) {
      console.error(e);
    }
  }

  async deleteGameSettings(id: ReturnType<typeof uuid.v4>) {
    try {
      const value = await this.getGameSettings();
      if (value) {
        const newValue = value.filter((gameSetting) => gameSetting.id !== id);
        await this.setGameSettings(newValue);
      }
    } catch (e) {
      console.error(e);
    }
  }
}

const asyncStorage = new AsyncStorage();

export const getAsyncStorage = () => {
  return asyncStorage;
};

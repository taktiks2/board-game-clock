import { Stack } from "expo-router";
import { useEffect } from "react";
import { RecoilRoot } from "recoil";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { getAsyncStorage } from "@/utils/asyncStorage";
import { generateInitialGameSettings } from "@/states/gameSettingState";

const as = getAsyncStorage();

export default function RootLayout() {
  useEffect(() => {
    (async () => {
      const gameSettings = await as.getGameSettings();
      if (!gameSettings) {
        await as.setGameSettings(generateInitialGameSettings());
      }
    })();
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RecoilRoot>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "#666",
            },
            headerTintColor: "#fff",
          }}
        >
          <Stack.Screen name="index" options={{ title: "Board Game Clock" }} />
          <Stack.Screen name="settings" options={{ title: "Settings" }} />
          <Stack.Screen
            name="gameOptionModal"
            options={{ title: "Game Option", presentation: "modal" }}
          />
        </Stack>
      </RecoilRoot>
    </GestureHandlerRootView>
  );
}

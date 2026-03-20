import { Stack } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useGameStore } from "@/stores/useGameStore";

export default function RootLayout() {
  const initialize = useGameStore((s) => s.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#666",
          },
          headerBackButtonDisplayMode: "minimal",
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
    </GestureHandlerRootView>
  );
}

import { View, StyleSheet, Alert } from "react-native";
import { useState, useEffect, useCallback } from "react";
import PlayerTimer from "@/components/PlayerTimer";
import MenuBar from "@/components/MenuBar";
import Overlay from "@/components/Overlay";
import { useGameStore } from "@/stores/useGameStore";
import { useSound } from "@/hooks/useSound";

export default function Index() {
  const currentSetting = useGameStore((s) => s.currentSetting);
  const resetPlayers = useGameStore((s) => s.resetPlayers);

  const [currentPlayer, setCurrentPlayer] = useState<number | null>(null);
  const [pause, setPause] = useState(true);
  const { playSound, mute, setMute } = useSound(currentSetting.isAudioOn);

  const handleChangePlayer = useCallback(() => {
    if (currentPlayer === null) return;
    playSound("change");
    setCurrentPlayer((currentPlayer + 1) % currentSetting.players.length);
  }, [currentPlayer, currentSetting.players.length, playSound]);

  const handleResume = useCallback(() => {
    if (currentPlayer === null) {
      setCurrentPlayer(0);
    }
    setPause(false);
  }, [currentPlayer]);

  const handleReload = useCallback(() => {
    Alert.alert("Reset", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        onPress: () => resetPlayers(),
      },
    ]);
  }, [resetPlayers]);

  useEffect(() => {
    setCurrentPlayer(null);
    setMute(!currentSetting.isAudioOn);
    setPause(true);
  }, [currentSetting, setMute]);

  return (
    <>
      {(currentPlayer === null || pause) && (
        <Overlay
          text={currentPlayer === null ? "Game Start" : "Resume"}
          onPress={handleResume}
        />
      )}
      <MenuBar
        pause={pause}
        mute={mute}
        onResume={handleResume}
        onPause={() => setPause(true)}
        onReload={handleReload}
        onMute={() => setMute(true)}
        onUnmute={() => setMute(false)}
      />
      <View style={styles.body}>
        {currentSetting.players.map((player, i) => (
          <PlayerTimer
            playSound={playSound}
            key={player.id}
            player={player}
            onPress={handleChangePlayer}
            active={player.order === currentPlayer}
            disable={player.order !== currentPlayer}
            pause={pause}
          />
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    gap: 10,
    padding: 10,
    backgroundColor: "#333",
    justifyContent: "space-between",
  },
});

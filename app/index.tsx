import { View, StyleSheet, Alert } from "react-native";
import { useState, useEffect } from "react";
import PlayerTimer from "@/components/PlayerTimer";
import MenuBar from "@/components/MenuBar";
import Overlay from "@/components/Overlay";
import { useRecoilState } from "recoil";
import { gameSettingState, refreshPlayers } from "@/states/gameSettingState";
import useAudio from "@/utils/useAudio";
import { getAsyncStorage } from "@/utils/asyncStorage";

const as = getAsyncStorage();

export default function Index() {
  const [gameSetting, setGameSetting] = useRecoilState(gameSettingState);
  const [currentPlayer, setCurrentPlayer] = useState<number | null>(null);
  const [pause, setPause] = useState(true);
  const [mute, setMute] = useState(false);
  const { playSound } = useAudio();

  const handleChangePlayer = async () => {
    if (currentPlayer === null) return;
    playSound("change", mute);
    setCurrentPlayer((currentPlayer + 1) % gameSetting.players.length);
  };

  const handleResume = () => {
    if (currentPlayer === null) {
      setCurrentPlayer(0);
    }
    setPause(false);
  };

  const handleReload = () => {
    Alert.alert("Reset", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        onPress: () => {
          setGameSetting((prev) => ({
            ...prev,
            players: refreshPlayers(gameSetting.players),
          }));
        },
      },
    ]);
  };

  useEffect(() => {
    (async () => {
      const storagedSetting = await as.getGameSettings();
      if (storagedSetting) {
        setGameSetting(storagedSetting[0]);
      }
    })();
  }, []);

  useEffect(() => {
    setPause(true);
    setCurrentPlayer(null);
  }, [gameSetting]);

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
        {gameSetting.players.map((player, i) => {
          return (
            <PlayerTimer
              key={i}
              mute={mute}
              player={player}
              onPress={handleChangePlayer}
              active={player.order === currentPlayer}
              disable={player.order !== currentPlayer}
              pause={pause}
            />
          );
        })}
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

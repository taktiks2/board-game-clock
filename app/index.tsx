import { View, StyleSheet, Alert } from "react-native";
import { useState, useEffect, useCallback } from "react";
import PlayerTimer from "@/components/PlayerTimer";
import MenuBar from "@/components/MenuBar";
import Overlay from "@/components/Overlay";
import { useRecoilState } from "recoil";
import { gameSettingState, refreshPlayers } from "@/states/gameSettingState";
import { getAsyncStorage } from "@/utils/asyncStorage";
import { Audio } from "expo-av";

const as = getAsyncStorage();

export interface Sounds {
  tiktak: Audio.Sound;
  beep: Audio.Sound;
  change: Audio.Sound;
}

export default function Index() {
  const [gameSetting, setGameSetting] = useRecoilState(gameSettingState);
  const [currentPlayer, setCurrentPlayer] = useState<number | null>(null);
  const [mute, setMute] = useState(!gameSetting.isAudioOn);
  const [pause, setPause] = useState(true);
  const [sounds, setSounds] = useState<Sounds | null>(null);

  const playSound = useCallback(
    async (name: keyof Sounds) => {
      if (!sounds || mute) return;
      await sounds[name].replayAsync();
    },
    [sounds, mute],
  );

  const handleChangePlayer = async () => {
    if (currentPlayer === null) return;
    playSound("change");
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
      const [tiktak, beep, change] = await Promise.all([
        await Audio.Sound.createAsync(require("@/assets/sounds/tiktak.mp3")),
        await Audio.Sound.createAsync(require("@/assets/sounds/beep.mp3")),
        await Audio.Sound.createAsync(require("@/assets/sounds/change.mp3")),
      ]);
      setSounds({
        tiktak: tiktak.sound,
        beep: beep.sound,
        change: change.sound,
      });

      const storagedSetting = await as.getGameSettings();
      if (storagedSetting) {
        setGameSetting(storagedSetting[0]);
        setMute(!storagedSetting[0].isAudioOn);
      }
    })();

    return sounds
      ? () => {
          Object.values(sounds).forEach((sound) => sound.unloadAsync());
        }
      : undefined;
  }, []);

  useEffect(() => {
    setCurrentPlayer(null);
    setMute(!gameSetting.isAudioOn);
    setPause(true);
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
              playSound={playSound}
              key={i}
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

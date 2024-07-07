import { View, StyleSheet } from "react-native";
import { useState } from "react";
import PlayerTimer from "@/components/PlayerTimer";
import MenuBar from "@/components/MenuBar";
import Overlay from "@/components/Overlay";
import { useRecoilValue } from "recoil";
import { playerState } from "@/states/playerState";

export default function Index() {
  const players = useRecoilValue(playerState);

  const [currentPlayer, setCurrentPlayer] = useState<number | null>(null);
  const [pause, setPause] = useState(true);
  const [mute, setMute] = useState(false);

  const handleChangePlayer = () => {
    if (currentPlayer === null) return;
    setCurrentPlayer((currentPlayer + 1) % players.length);
  };

  const handleResume = () => {
    if (currentPlayer === null) {
      setCurrentPlayer(0);
    }
    setPause(false);
  };

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
        onReload={() => {}}
        onMute={() => setMute(true)}
        onUnmute={() => setMute(false)}
      />
      <View style={styles.body}>
        {players.map((player, i) => {
          const active = player.order === currentPlayer;
          return (
            <PlayerTimer
              key={i}
              name={player.name}
              time={player.time}
              order={player.order}
              onPress={handleChangePlayer}
              active={active}
              disable={!active}
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

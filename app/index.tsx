import { View, StyleSheet } from "react-native";
import PlayerTimer from "@/components/PlayerTimer";
import { useState } from "react";

interface Player {
  name: string;
  time: number;
  order: number;
}

export default function Details() {
  const players: Player[] = [
    { name: "Player1", time: 10, order: 0 },
    { name: "Player2", time: 10, order: 1 },
    { name: "Player3", time: 10, order: 2 },
    { name: "Player4", time: 10, order: 3 },
  ];

  const [currentPlayer, setCurrentPlayer] = useState(0);

  const handleChangePlayer = () => {
    setCurrentPlayer((prev) => (prev + 1) % players.length);
  };

  return (
    <View style={styles.container}>
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
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    padding: 10,
    backgroundColor: "#333",
    justifyContent: "space-between",
  },
});

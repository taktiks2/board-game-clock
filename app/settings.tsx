import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { useRecoilState, useSetRecoilState } from "recoil";
import { settingPlayerState, playerState } from "@/states/playerState";
import Button from "@/components/Button";
import { useState } from "react";
import PlayerNumberSelector from "@/components/PlayerNumberSelector";
import PlayerProfile from "@/components/PlayerProfile";
import { Player, generateDefaultPlayer } from "@/states/playerState";
import { router } from "expo-router";

const PLAYERS = Array.from({ length: 3 }, (_, i) => i + 2);

export default function Settings() {
  const [players, setPlayers] = useRecoilState(settingPlayerState);
  const setPlayerState = useSetRecoilState(playerState);
  const [playerNumber, setPlayerNumber] = useState(players.length);

  const handleUpdatePlayerNumber = (num: number) => {
    if (players.length < num) {
      setPlayers([
        ...players,
        ...Array.from(
          { length: num - players.length },
          (_, i) => i + players.length,
        ).map(generateDefaultPlayer),
      ]);
    } else {
      setPlayers(players.slice(0, num));
    }
    setPlayerNumber(num);
  };

  const handleUpdatePlayer = (value: Player) => {
    const newPlayers = players.map((player) => {
      if (player.order === value.order) {
        return value;
      }
      return player;
    });
    setPlayers(newPlayers);
  };

  const handlePress = () => {
    Alert.alert("Game Start", "Are you ready?", [
      {
        text: "Cancel",
        style: "cancel",
        onPress: () => {},
      },
      {
        text: "OK",
        onPress: () => {
          // NOTE: 新しいオブジェクトを生成して、Recoil の状態を更新する
          setPlayerState([...players]);
          router.back();
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.playerNumberSelector}>
        <PlayerNumberSelector
          items={PLAYERS}
          value={playerNumber}
          onUpdate={handleUpdatePlayerNumber}
        />
      </View>
      {players.map((player, i) => {
        return (
          <View key={i} style={styles.playerProfile}>
            <PlayerProfile value={player} onUpdate={handleUpdatePlayer} />
          </View>
        );
      })}
      <Button text="Start" onPress={handlePress} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#333",
  },
  playerNumberSelector: {
    marginBottom: 10,
  },
  playerProfile: {
    marginBottom: 10,
  },
});

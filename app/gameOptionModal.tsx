import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Switch,
  Text,
} from "react-native";
import { useRecoilState, useSetRecoilState } from "recoil";
import { settingPlayerState, playerState } from "@/states/playerState";
import Button from "@/components/Button";
import { useState } from "react";
import PlayerNumberSelector from "@/components/PlayerNumberSelector";
import PlayerProfile from "@/components/PlayerProfile";
import { generateDefaultPlayer, refreshPlayers } from "@/states/playerState";
import { router } from "expo-router";
import { Player } from "@/utils/types";

const PLAYERS = Array.from({ length: 3 }, (_, i) => i + 2);

export default function Settings() {
  const [players, setPlayers] = useRecoilState(settingPlayerState);
  const setPlayerState = useSetRecoilState(playerState);
  const [playerCount, setPlayerCount] = useState(players.length);

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
    setPlayerCount(num);
  };

  const handleUpdatePlayer = (value: Player) => {
    const newPlayers = players.map((player) => {
      if (player.id === value.id) {
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
      },
      {
        text: "OK",
        onPress: () => {
          setPlayerState(refreshPlayers(players));
          router.back();
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.switchs}>
        <Text>音量</Text>
        <Switch />
        <Text>画面スリープ</Text>
        <Switch />
      </View>
      <View style={styles.playerNumberSelector}>
        <PlayerNumberSelector
          items={PLAYERS}
          value={playerCount}
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
      <View style={styles.storage}>
        <Button text="読込" onPress={() => {}} />
        <Button text="保存" onPress={() => {}} />
      </View>
      <Button text="Start" onPress={handlePress} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#333",
  },
  switchs: {
    flexDirection: "row",
  },
  playerNumberSelector: {
    marginBottom: 10,
  },
  playerProfile: {
    marginBottom: 10,
  },
  storage: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
});

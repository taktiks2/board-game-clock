import { Alert, View, StyleSheet, Switch, Text, TextInput } from "react-native";
import { useState, useEffect } from "react";
import Button from "@/components/Button";
import PlayerNumberSelector from "@/components/PlayerNumberSelector";
import PlayerProfile from "@/components/PlayerProfile";
import {
  generateDefaultPlayer,
  generateGameSetting,
} from "@/utils/gameSettingFactory";
import { Player } from "@/utils/types";
import { useGameStore } from "@/stores/useGameStore";
import { useRouter, useLocalSearchParams } from "expo-router";

const PLAYERS = Array.from({ length: 3 }, (_, i) => i + 2);

export default function GameOptionModal() {
  const [setting, setSetting] = useState(generateGameSetting(2));
  const allSettings = useGameStore((s) => s.allSettings);
  const addSetting = useGameStore((s) => s.addSetting);
  const updateSetting = useGameStore((s) => s.updateSetting);
  const router = useRouter();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    if (id) {
      const target = allSettings.find((s) => s.id === id);
      if (target) {
        setSetting(target);
      }
    }
  }, [id, allSettings]);

  const handleUpdateAudioOn = (flag: boolean) => {
    setSetting({ ...setting, isAudioOn: flag });
  };

  const handleUpdatePlayerNumber = (num: number) => {
    setSetting({
      ...setting,
      playerCount: num,
      players:
        setting.players.length < num
          ? [
              ...setting.players,
              ...Array.from(
                { length: num - setting.players.length },
                (_, i) => generateDefaultPlayer(i + setting.players.length),
              ),
            ]
          : setting.players.slice(0, num),
    });
  };

  const handleUpdatePlayer = (value: Player) => {
    setSetting({
      ...setting,
      players: setting.players.map((p) => (p.id === value.id ? value : p)),
    });
  };

  const handleSave = () => {
    const isNew = !allSettings.some((item) => item.id === setting.id);

    Alert.alert("Save", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        onPress: async () => {
          if (isNew) {
            await addSetting(setting);
          } else {
            await updateSetting(setting);
          }
          router.back();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.settingContainer}>
        <TextInput
          style={styles.nameInput}
          value={setting.name}
          onChangeText={(v) => setSetting({ ...setting, name: v })}
        />
        <View style={styles.switchContainer}>
          <Text style={styles.label}>音量</Text>
          <Switch
            value={setting.isAudioOn}
            onValueChange={handleUpdateAudioOn}
          />
        </View>
        <PlayerNumberSelector
          items={PLAYERS}
          value={setting.playerCount}
          onUpdate={handleUpdatePlayerNumber}
        />
        {setting.players.map((player) => (
          <PlayerProfile
            key={player.id}
            value={player}
            onUpdate={handleUpdatePlayer}
          />
        ))}
      </View>
      <View style={styles.save}>
        <Button text="保存" onPress={handleSave} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 30,
    justifyContent: "space-between",
  },
  settingContainer: {
    gap: 20,
  },
  switchContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    color: "#ddd",
    fontSize: 24,
  },
  nameInput: {
    paddingVertical: 4,
    backgroundColor: "#ddd",
    color: "#000",
    textAlign: "left",
    borderWidth: 2,
    borderRadius: 5,
    fontSize: 24,
    paddingHorizontal: 10,
  },
  save: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
});

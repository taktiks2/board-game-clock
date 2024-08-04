import { Alert, View, StyleSheet, Switch, Text, TextInput } from "react-native";
import { useState, useEffect } from "react";
import Button from "@/components/Button";
import PlayerNumberSelector from "@/components/PlayerNumberSelector";
import PlayerProfile from "@/components/PlayerProfile";
import {
  generateDefaultPlayer,
  generateGameSetting,
  gameSettingsState,
} from "@/states/gameSettingState";
import { Player, GameSetting } from "@/utils/types";
import { getAsyncStorage } from "@/utils/asyncStorage";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSetRecoilState } from "recoil";

const PLAYERS = Array.from({ length: 3 }, (_, i) => i + 2);

const as = getAsyncStorage();

export default function GameOptionModal() {
  const [setting, setSetting] = useState(generateGameSetting(2));
  const setGameSettingsState = useSetRecoilState(gameSettingsState);
  const router = useRouter();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    (async () => {
      if (id) {
        const gameSettings = await as.getGameSettings();
        if (gameSettings) {
          const target = gameSettings.find((setting) => setting.id === id);
          if (target) {
            setSetting(target);
          }
        }
      }
    })();
  }, []);

  const handleUpdateAudioOn = (flag: boolean) => {
    setSetting({
      ...setting,
      isAudioOn: flag,
    });
  };

  // const handleUpdateKeepAwake = (flag: boolean) => {
  //   setSetting({
  //     ...setting,
  //     isKeepAwake: flag,
  //   });
  // };

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
                (_, i) => i + setting.players.length,
              ).map((i) => generateDefaultPlayer(i)),
            ]
          : setting.players.slice(0, num),
    });
  };

  const handleUpdatePlayer = (value: Player) => {
    const newPlayers = setting.players.map((player) => {
      if (player.id === value.id) {
        return value;
      }
      return player;
    });
    setSetting({
      ...setting,
      players: newPlayers,
    });
  };

  const handleSave = async () => {
    const gameSettings = await as.getGameSettings();
    let newSettings: GameSetting[] = [];
    if (gameSettings) {
      if (!gameSettings.some((item) => item.id === setting.id)) {
        // TODO: 新規作成時
        newSettings = [setting, ...gameSettings];
      } else {
        // TODO: 編集時
        newSettings = gameSettings.map((item) => {
          if (item.id === setting.id) {
            return setting;
          }
          return item;
        });
      }
    }
    Alert.alert("Save", "Are you sure?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          as.setGameSettings(newSettings);
          setGameSettingsState(newSettings);
          router.back();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.settingContainer}>
        <TextInput
          style={{
            paddingVertical: 4,
            backgroundColor: "#ddd",
            color: "#000",
            textAlign: "left",
            borderWidth: 2,
            borderRadius: 5,
            fontSize: 24,
            paddingHorizontal: 10,
          }}
          value={setting.name}
          onChangeText={(v) => {
            setSetting({
              ...setting,
              name: v,
            });
          }}
        />
        <View style={styles.switchContainer}>
          <Text style={styles.label}>音量</Text>
          <Switch
            value={setting.isAudioOn}
            onValueChange={handleUpdateAudioOn}
          />
        </View>
        {/* <View style={styles.switchContainer}> */}
        {/*   <Text style={styles.label}>画面スリープ</Text> */}
        {/*   <Switch */}
        {/*     value={setting.isKeepAwake} */}
        {/*     onValueChange={handleUpdateKeepAwake} */}
        {/*   /> */}
        {/* </View> */}
        <PlayerNumberSelector
          items={PLAYERS}
          value={setting.playerCount}
          onUpdate={handleUpdatePlayerNumber}
        />
        {setting.players.map((player) => {
          return (
            <PlayerProfile
              key={"" + player.id}
              value={player}
              onUpdate={handleUpdatePlayer}
            />
          );
        })}
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
  save: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  buttonContainer: {
    flex: 1,
  },
});

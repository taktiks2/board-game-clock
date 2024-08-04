import {
  View,
  StyleSheet,
  Text,
  Alert,
  Pressable,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { getAsyncStorage } from "@/utils/asyncStorage";
import { Swipeable } from "react-native-gesture-handler";
import Button from "@/components/Button";
import GameOptionModal from "@/components/GameOptionModal";
import { useRouter } from "expo-router";
import { useRecoilState, useSetRecoilState } from "recoil";
import { gameSettingState, gameSettingsState } from "@/states/gameSettingState";
import { SvgXml } from "react-native-svg";
import { logo } from "@/utils/svg";
import { Ionicons } from "@expo/vector-icons";

const as = getAsyncStorage();

export default function Settings() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const setGameSettingState = useSetRecoilState(gameSettingState);
  const [gameSettings, setGameSettings] = useRecoilState(gameSettingsState);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const newGameSettings = await as.getGameSettings();
      if (newGameSettings) {
        setGameSettings(newGameSettings);
      }
    })();
  }, [gameSettings]);

  const handleRoute = () => {
    router.push("/gameOptionModal");
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
          setGameSettingState(gameSettings[selectedIndex]);
          router.back();
        },
      },
    ]);
  };

  const handleDelete = (index: number) => {
    if (gameSettings.length === 1) {
      Alert.alert("Oops!", "Can't delete last one", [
        {
          text: "OK",
        },
      ]);
      return;
    }
    const newGameSettings = gameSettings.filter((_, i) => i !== index);
    setGameSettings(newGameSettings);
    as.setGameSettings(newGameSettings);
    if (index === selectedIndex) {
      setSelectedIndex(0);
    }
  };

  const handleEdit = (index: number) => {
    router.push({
      pathname: "/gameOptionModal",
      params: {
        id: gameSettings[index].id,
      },
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.logoContainer}>
          <SvgXml xml={logo} />
        </View>
        <View style={styles.addButtonContainer}>
          <Button text="Add" onPress={handleRoute} />
        </View>
        <View style={styles.listContainer}>
          {gameSettings.map((gameSetting, i) => {
            return (
              <Swipeable
                key={"" + gameSetting.id}
                overshootLeft={false}
                overshootRight={false}
                renderLeftActions={() => (
                  <Pressable
                    style={{
                      width: "25%",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "green",
                    }}
                    onPress={() => handleEdit(i)}
                  >
                    <View>
                      <Text>Edit</Text>
                    </View>
                  </Pressable>
                )}
                renderRightActions={() => (
                  <Pressable
                    style={{
                      width: "25%",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "red",
                    }}
                    onPress={() => handleDelete(i)}
                  >
                    <View>
                      <Text>Delete</Text>
                    </View>
                  </Pressable>
                )}
              >
                <Pressable
                  onPress={() => setSelectedIndex(i)}
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    backgroundColor: "#666",
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                    height: 50,
                  }}
                >
                  <Text style={{ color: "#ddd" }}>{gameSetting.name}</Text>
                  {i === selectedIndex && (
                    <Ionicons name="checkmark" size={18} color="#3ff" />
                  )}
                </Pressable>
              </Swipeable>
            );
          })}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button text="Start" onPress={handlePress} />
      </View>
      <GameOptionModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: "#333",
  },
  logoContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  scrollViewContainer: {
    height: "90%",
  },
  listContainer: {
    gap: 1,
    overflow: "hidden",
    borderRadius: 10,
  },
  addButtonContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
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
    backgroundColor: "#8f8",
    marginBottom: 10,
  },
});

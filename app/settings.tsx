import {
  View,
  StyleSheet,
  Text,
  Alert,
  Pressable,
  Platform,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { getAsyncStorage } from "@/utils/asyncStorage";
import { Swipeable } from "react-native-gesture-handler";
import Button from "@/components/Button";
import GameOptionModal from "@/components/GameOptionModal";
import { useRouter } from "expo-router";
import { useSetRecoilState } from "recoil";
import {
  gameSettingState,
  generateInitialGameSettings,
} from "@/states/gameSettingState";

const as = getAsyncStorage();

const isIos = Platform.OS === "ios";

export default function Settings() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const setGameSettingState = useSetRecoilState(gameSettingState);
  const [gameSettings, setGameSettings] = useState(
    generateInitialGameSettings(),
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const gameSettings = await as.getGameSettings();
      if (gameSettings) {
        setGameSettings(gameSettings);
      }
    })();
  }, []);

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

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.addButtonContainer}>
          <Button
            text="Add"
            onPress={() => (isIos ? handleRoute() : setIsModalVisible(true))}
          />
        </View>
        <View style={styles.listContainer}>
          {gameSettings.map((gameSetting, index) => {
            return (
              <Swipeable
                key={"" + gameSetting.id}
                friction={2}
                overshootLeft={false}
                overshootRight={false}
                renderLeftActions={() => (
                  <Pressable
                    style={{
                      width: "25%",
                      backgroundColor: "green",
                    }}
                    onPress={() => console.log("edit")}
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
                      backgroundColor: "red",
                    }}
                    onPress={() => console.log("delete")}
                  >
                    <View>
                      <Text>Delete</Text>
                    </View>
                  </Pressable>
                )}
              >
                <Pressable
                  onPress={() => setSelectedIndex(index)}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor:
                      selectedIndex === index ? "yellow" : "blue",
                    height: 100,
                  }}
                >
                  <Text>{gameSetting.name}</Text>
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
    paddingHorizontal: 30,
    paddingBottom: 30,
    backgroundColor: "#333",
  },
  scrollViewContainer: {
    height: "90%",
  },
  listContainer: {
    gap: 5,
    overflow: "hidden",
    borderRadius: 10,
  },
  addButtonContainer: {
    marginTop: 10,
    marginBottom: 10,
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
    marginBottom: 10,
  },
});

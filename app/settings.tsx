import {
  View,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { getAsyncStorage } from "@/utils/asyncStorage";
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { Swipeable } from "react-native-gesture-handler";
import Button from "@/components/Button";
import GameOptionModal from "@/components/GameOptionModal";
import { useRouter } from "expo-router";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  settingPlayerState,
  playerState,
  refreshPlayers,
} from "@/states/playerState";

const asyncStorage = getAsyncStorage();

const isIos = Platform.OS === "ios";

export default function Settings() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const setPlayerState = useSetRecoilState(playerState);
  const router = useRouter();

  const initData = Array.from({ length: 20 }, (_, i) => ({
    key: i,
    label: "label" + i,
  }));

  const [data, setData] = useState(initData);

  interface Item {
    key: number;
    label: string;
  }

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Item>) => {
    return (
      <ScaleDecorator>
        <Swipeable
          renderLeftActions={() => (
            <TouchableOpacity onPress={() => console.log("edit")}>
              <View>
                <Text>Edit</Text>
              </View>
            </TouchableOpacity>
          )}
          renderRightActions={() => (
            <TouchableOpacity onPress={() => console.log("delete")}>
              <View>
                <Text>Delete</Text>
              </View>
            </TouchableOpacity>
          )}
        >
          <TouchableOpacity
            disabled={isActive}
            onLongPress={drag}
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: isActive ? "red" : "blue",
              height: 100,
            }}
          >
            <Text>{item.label}</Text>
          </TouchableOpacity>
        </Swipeable>
      </ScaleDecorator>
    );
  };

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
          setPlayerState(refreshPlayers(players));
          router.back();
        },
      },
    ]);
  };

  return (
    <>
      <View style={styles.container}>
        <Button
          text="Add"
          onPress={() => (isIos ? handleRoute() : setIsModalVisible(true))}
        />
        <DraggableFlatList
          data={data}
          onDragEnd={({ data }) => setData(data)}
          keyExtractor={(item) => `${item.key}`}
          renderItem={renderItem}
        />
      </View>
      <Button text="Start" onPress={handlePress} />
      <GameOptionModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </>
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

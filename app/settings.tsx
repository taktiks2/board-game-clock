import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
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

const asyncStorage = getAsyncStorage();

const isIos = Platform.OS === "ios";

export default function Settings() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const initData = Array.from({ length: 3 }, (_, i) => ({
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
            }}
          >
            <Text>{item.label}</Text>
          </TouchableOpacity>
        </Swipeable>
      </ScaleDecorator>
    );
  };

  return (
    <View style={styles.container}>
      {/* <Button href="/gameOptionModal" text="Add" onPress={() => {}} /> */}
      <Button
        {...(isIos && { href: "/gameOptionModal" })}
        text="Add"
        onPress={() => (isIos ? {} : setIsModalVisible(true))}
      />
      <DraggableFlatList
        data={data}
        onDragEnd={({ data }) => setData(data)}
        keyExtractor={(item) => `${item.key}`}
        renderItem={renderItem}
      />
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

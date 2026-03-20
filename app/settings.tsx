import {
  View,
  StyleSheet,
  Text,
  Alert,
  Pressable,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { Swipeable } from "react-native-gesture-handler";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { useGameStore } from "@/stores/useGameStore";
import { SvgXml } from "react-native-svg";
import { logo } from "@/utils/svg";
import { Ionicons } from "@expo/vector-icons";

export default function Settings() {
  const allSettings = useGameStore((s) => s.allSettings);
  const selectSetting = useGameStore((s) => s.selectSetting);
  const deleteSetting = useGameStore((s) => s.deleteSetting);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const handleRoute = () => {
    router.push("/gameOptionModal");
  };

  const handlePress = () => {
    Alert.alert("Game Start", "Are you ready?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        onPress: () => {
          selectSetting(selectedIndex);
          router.back();
        },
      },
    ]);
  };

  const handleDelete = (index: number) => {
    if (allSettings.length === 1) {
      Alert.alert("Oops!", "Can't delete last one", [{ text: "OK" }]);
      return;
    }
    deleteSetting(allSettings[index].id);
    if (index === selectedIndex) {
      setSelectedIndex(0);
    }
  };

  const handleEdit = (index: number) => {
    router.push({
      pathname: "/gameOptionModal",
      params: { id: allSettings[index].id },
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
          {allSettings.map((gameSetting, i) => (
            <Swipeable
              key={gameSetting.id}
              overshootLeft={false}
              overshootRight={false}
              renderLeftActions={() => (
                <Pressable
                  style={styles.editAction}
                  onPress={() => handleEdit(i)}
                >
                  <Text>Edit</Text>
                </Pressable>
              )}
              renderRightActions={() => (
                <Pressable
                  style={styles.deleteAction}
                  onPress={() => handleDelete(i)}
                >
                  <Text>Delete</Text>
                </Pressable>
              )}
            >
              <Pressable
                onPress={() => setSelectedIndex(i)}
                style={styles.listItem}
              >
                <Text style={styles.listItemText}>{gameSetting.name}</Text>
                {i === selectedIndex && (
                  <Ionicons name="checkmark" size={18} color="#3ff" />
                )}
              </Pressable>
            </Swipeable>
          ))}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button text="Start" onPress={handlePress} />
      </View>
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
  editAction: {
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
  },
  deleteAction: {
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },
  listItem: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#666",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    height: 50,
  },
  listItemText: {
    color: "#ddd",
  },
});

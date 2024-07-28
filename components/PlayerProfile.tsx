import { View, StyleSheet, TextInput } from "react-native";
import TimePicker from "@/components/TimePicker";
import { Player } from "@/utils/types";

interface Props {
  value: Player;
  onUpdate: (value: Player) => void;
}

export default function PlayerProfile({ value, onUpdate }: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        value={value.name}
        onChangeText={(v) => {
          onUpdate({ ...value, name: v });
        }}
      />
      <TimePicker
        value={value.time}
        onUpdate={(v) => {
          onUpdate({ ...value, time: v });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
  },
  textInput: {
    backgroundColor: "#ddd",
    color: "#000",
    textAlign: "left",
    borderWidth: 2,
    borderRadius: 5,
    width: 100,
    paddingHorizontal: 10,
  },
  text: {
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
  },
});

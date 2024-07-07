import { Text, StyleSheet, TouchableOpacity } from "react-native";

interface Props {
  text: string;
  onPress: () => void;
}

export default function Button({ onPress, text }: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 60,
    backgroundColor: "#55f",
    borderRadius: 10,
  },
  text: {
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
    lineHeight: 60,
  },
});

import { Pressable, Text, StyleSheet } from "react-native";

interface Props {
  text: string;
  onPress: () => void;
}

export default function MenuBar({ onPress, text }: Props) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    position: "absolute",
    top: 50,
    left: 0,
    zIndex: 1,
  },
  text: {
    color: "#fff",
    fontSize: 24,
  },
});

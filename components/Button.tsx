import { Text, StyleSheet, TouchableOpacity } from "react-native";

interface Props {
  text: string;
  height?: number;
  fontSize?: number;
  onPress: () => void;
}

export default function Button({
  onPress,
  fontSize = 24,
  height = 55,
  text,
}: Props) {
  return (
    <TouchableOpacity style={[styles.container, { height }]} onPress={onPress}>
      <Text style={[styles.text, { fontSize, lineHeight: height }]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#55f",
    borderRadius: 10,
  },
  text: {
    color: "#fff",
    textAlign: "center",
  },
});

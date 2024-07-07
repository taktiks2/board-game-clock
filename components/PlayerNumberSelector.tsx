import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

interface Props {
  items: number[];
  value: number;
  onUpdate: (num: number) => void;
}

export default function PlayerNumberSelector({
  items,
  value,
  onUpdate,
}: Props) {
  return (
    <View style={styles.container}>
      {items.map((num, i) => {
        return (
          <TouchableOpacity
            key={i}
            style={[
              styles.element,
              value === num ? styles.selected : styles.default,
            ]}
            disabled={value === num}
            onPress={() => onUpdate(num)}
          >
            <Text>{num}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#888",
    width: "100%",
    height: 50,
    flexDirection: "row",
    borderRadius: 10,
    justifyContent: "space-between",
    padding: 2,
    gap: 2,
  },
  text: {
    color: "#fff",
    fontSize: 24,
  },
  element: {
    flex: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  selected: {
    backgroundColor: "#55f",
  },
  default: {
    backgroundColor: "#aaa",
  },
});

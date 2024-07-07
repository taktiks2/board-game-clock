import { Text, StyleSheet, Modal } from "react-native";

interface Props {
  items: string[];
  onUpdate: () => void;
}

export default function ColorPicker({ items, onUpdate }: Props) {
  return (
    <Modal animationType="slide" visible={}>
      <Text>test</Text>
    </Modal>
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

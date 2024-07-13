import { Text, StyleSheet, Modal } from "react-native";

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

export default function ColorPickerModal({ isVisible, onClose }: Props) {
  return (
    <Modal animationType="fade" visible={isVisible}>
      <Text>ColorPickerModal</Text>
      <Text style={styles.text} onPress={onClose}>
        Close
      </Text>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    backgroundColor: "#f55",
    borderRadius: 10,
  },
  text: {
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
    lineHeight: 60,
  },
});

import { useState } from "react";
import { Text, View, StyleSheet, Modal } from "react-native";
import ColorPickerModal from "./ColorPickerModal";

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

export default function GameOptionModal({ isVisible, onClose }: Props) {
  const [isColorPickerVisible, setColorPickerVisible] = useState(false);
  return (
    <>
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={styles.container}>
          <Text style={styles.text}>GameOptionModal</Text>
          <Text style={styles.text} onPress={onClose}>
            Close
          </Text>
          <Text style={styles.text} onPress={() => setColorPickerVisible(true)}>
            Open
          </Text>
        </View>
      </Modal>
      <ColorPickerModal
        isVisible={isColorPickerVisible}
        onClose={() => setColorPickerVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "95%",
    backgroundColor: "#5f5",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: "absolute",
    bottom: 0,
  },
  text: {
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
    lineHeight: 60,
  },
});

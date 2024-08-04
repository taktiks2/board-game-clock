import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

interface Props {
  pause: boolean;
  mute: boolean;
  onResume: () => void;
  onPause: () => void;
  onReload: () => void;
  onMute: () => void;
  onUnmute: () => void;
}

const SIZE = 32;
const COLOR = "#888";

export default function MenuBar({
  pause,
  mute,
  onResume,
  onPause,
  onMute,
  onUnmute,
  onReload,
}: Props) {
  return (
    <View style={styles.container}>
      <Link href="/settings" onPress={onPause}>
        <Ionicons name="settings" size={SIZE} color={COLOR} />
      </Link>
      {pause ? (
        <Ionicons name="play" size={SIZE} color={COLOR} onPress={onResume} />
      ) : (
        <Ionicons name="pause" size={SIZE} color={COLOR} onPress={onPause} />
      )}
      <Ionicons name="reload" size={SIZE} color={COLOR} onPress={onReload} />
      {mute ? (
        <Ionicons
          name="volume-mute"
          size={SIZE}
          color={COLOR}
          onPress={onUnmute}
        />
      ) : (
        <Ionicons
          name="volume-high"
          size={SIZE}
          color={COLOR}
          onPress={onMute}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#555",
    paddingHorizontal: 10,
  },
});

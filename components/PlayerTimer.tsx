import { useState, useEffect } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { playerColors, defaultColor } from "@/constants/Colors";
import { Player } from "@/states/playerState";
import Timer from "@/components/Timer";

interface Props {
  active: boolean;
  disable: boolean;
  pause: boolean;
  player: Player;
  onPress: () => void;
}

export default function PlayerTimer({
  active,
  disable,
  pause,
  player,
  onPress,
}: Props) {
  const [timer, setTimer] = useState(player.time);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    const id = setInterval(() => {
      setTimer((prev) => {
        if (prev === 0) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setTimerId(id);
  };

  const stopTimer = () => {
    if (timerId) {
      clearInterval(timerId);
    }
  };

  const handlePress = () => {
    stopTimer();
    setTimer(player.time);
    onPress();
  };

  useEffect(() => {
    setTimer(player.time);
  }, [player]);

  useEffect(() => {
    if (pause) {
      stopTimer();
    } else if (active) {
      startTimer();
    }
    return () => stopTimer();
  }, [active, pause]);

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disable}
      style={[
        styles.container,
        {
          backgroundColor: active ? playerColors[player.order] : defaultColor,
        },
      ]}
    >
      <Text style={styles.text}>{player.name}</Text>
      <Timer value={timer} danger={timer <= 10} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  text: {
    fontSize: 24,
    color: "#111",
  },
});

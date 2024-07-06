import { useState, useEffect } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { playerColors, defaultColor } from "@/constants/Colors";

interface Props {
  active: boolean;
  disable: boolean;
  time: number;
  name: string;
  order: number;
  onPress: () => void;
}

export default function PlayerTimer({
  active,
  disable,
  time,
  name,
  order,
  onPress,
}: Props) {
  const [timer, setTimer] = useState(time);
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
    setTimer(time);
    onPress();
  };

  useEffect(() => {
    if (active) {
      startTimer();
    }
    return () => stopTimer();
  }, [active]);

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disable}
      style={[
        styles.container,
        {
          backgroundColor: active ? playerColors[order] : defaultColor,
        },
      ]}
    >
      <Text>{name}</Text>
      <Text>{timer}</Text>
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
});

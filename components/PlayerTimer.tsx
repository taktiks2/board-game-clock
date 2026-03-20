import { useState, useEffect, useCallback, useRef } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { playerColors, defaultColor } from "@/constants/Colors";
import { Player } from "@/utils/types";
import Timer from "@/components/Timer";

export type SoundName = "tiktak" | "beep" | "change";

interface Props {
  playSound: (sound: SoundName) => void;
  active: boolean;
  disable: boolean;
  pause: boolean;
  player: Player;
  onPress: () => void;
}

export default function PlayerTimer({
  playSound,
  active,
  disable,
  pause,
  player,
  onPress,
}: Props) {
  const [timer, setTimer] = useState(player.time);
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);

  const stopTimer = useCallback(() => {
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    stopTimer();
    timerIdRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev === 0) return 0;
        const newTime = prev - 1;
        if (newTime === 0) {
          playSound("beep");
        } else if (newTime <= 10) {
          playSound("tiktak");
        }
        return newTime;
      });
    }, 1000);
  }, [playSound, stopTimer]);

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
    return stopTimer;
  }, [active, pause, startTimer, stopTimer]);

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

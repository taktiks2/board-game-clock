import { Text, StyleSheet } from "react-native";
import { useMemo } from "react";
import { padStart } from "@/utils/string";

interface Props {
  value: number;
  reverse?: boolean;
}

export default function Timer({ value }: Props) {
  const timer = useMemo(() => {
    const { hour, minute, second } = {
      hour: padStart(Math.floor(value / 3600).toString()),
      minute: padStart(Math.floor((value % 3600) / 60).toString()),
      second: padStart((value % 60).toString()),
    };

    if (hour === "00") {
      if (minute === "00") {
        return second;
      }
      return `${minute}:${second}`;
    }
    return `${hour}:${minute}:${second}`;
  }, [value]);

  return <Text style={styles.text}>{timer}</Text>;
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

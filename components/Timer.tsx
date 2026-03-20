import { Text, StyleSheet } from "react-native";
import { useMemo } from "react";
import { formatTime } from "@/utils/time";

interface Props {
  value: number;
  danger?: boolean;
}

export default function Timer({ value, danger }: Props) {
  const display = useMemo(() => formatTime(value), [value]);

  return (
    <Text style={[styles.text, danger ? styles.danger : styles.default]}>
      {display}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
  },
  default: {
    color: "#111",
  },
  danger: {
    color: "#f11",
  },
});

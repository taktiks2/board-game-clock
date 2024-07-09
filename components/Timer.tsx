import { Text, StyleSheet } from "react-native";
import { useMemo } from "react";
import { padStart } from "@/utils/string";

interface Props {
  value: number;
}

export default function Timer({ value }: Props) {
  const { hour, minute, second } = useMemo(() => {
    return {
      hour: Math.floor(value / 3600).toString(),
      minute: Math.floor((value % 3600) / 60).toString(),
      second: (value % 60).toString(),
    };
  }, [value]);
  return (
    <>
      <Text style={styles.text}>
        {`${padStart(hour)}:${padStart(minute)}:${padStart(second)}`}
      </Text>
    </>
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

import { Text, View, StyleSheet } from "react-native";
import NumberInput from "@/components/NumberInput";
import { useState } from "react";

interface Props {
  value: number;
  onUpdate: (num: number) => void;
}

export default function TimePicker({ value, onUpdate }: Props) {
  const [hour, setHour] = useState(Math.floor(value / 3600));
  const [minute, setMinute] = useState(Math.floor((value % 3600) / 60));
  const [second, setSecond] = useState(value % 60);

  const calculateTime = () => {
    onUpdate(hour * 3600 + minute * 60 + second);
  };

  const handleChangeHour = (num: number) => {
    setHour(num);
    calculateTime();
  };

  const handleChangeMinute = (num: number) => {
    setMinute(num);
    calculateTime();
  };

  const handleChangeSecond = (num: number) => {
    setSecond(num);
    calculateTime();
  };

  return (
    <View style={styles.container}>
      <NumberInput maxValue={99} value={hour} onUpdate={handleChangeHour} />
      <Text style={styles.text}>:</Text>
      <NumberInput maxValue={59} value={minute} onUpdate={handleChangeMinute} />
      <Text style={styles.text}>:</Text>
      <NumberInput maxValue={59} value={second} onUpdate={handleChangeSecond} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontSize: 42,
    top: -3.5,
  },
});

import { TextInput, StyleSheet } from "react-native";
import { useState, useRef } from "react";

interface Props {
  value: number;
  maxValue: number;
  onUpdate: (num: number) => void;
}

const padStart = (value: string) => {
  return value.padStart(2, "0");
};

export default function NumberInput({ value, maxValue, onUpdate }: Props) {
  const textValue = padStart(value.toString());
  const textMaxValue = padStart(maxValue.toString());
  const [tempValue, setTempValue] = useState(textValue);
  const textInputRef = useRef<TextInput>(null);

  const handleChange = (v: string) => {
    if (/^\d{0,2}$/.test(v)) {
      setTempValue(v);
      if (v.length === 2) {
        textInputRef.current?.blur();
      }
    }
  };

  const handleBlur = () => {
    if (!tempValue) {
      setTempValue(textValue);
      return;
    }
    let newValue = padStart(tempValue);
    if (parseInt(newValue) > maxValue) {
      newValue = textMaxValue;
    }
    setTempValue(newValue);
    onUpdate(parseInt(newValue));
  };

  const handleFocus = () => {
    setTempValue("");
  };

  return (
    <TextInput
      ref={textInputRef}
      value={tempValue}
      placeholder={textValue}
      style={styles.input}
      keyboardType="numeric"
      onChangeText={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      maxLength={2}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    color: "#000",
    fontSize: 42,
    textAlign: "center",
  },
});

import { Picker } from "@react-native-picker/picker";
import { View } from "react-native";

import AppText from "../AppText";

import { AppSelectProps } from "./types";
import { styles } from "./styles";

export default function AppSelect({
  label,
  value,
  options,
  onValueChange,
  placeholder,
}: AppSelectProps) {
  return (
    <View>
      {label && <AppText>{label}</AppText>}

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={value}
          onValueChange={onValueChange}
        >
          {placeholder && (
            <Picker.Item
              label={placeholder}
              value={0}
            />
          )}

          {options.map((option) => (
            <Picker.Item
              key={String(option.value)}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}

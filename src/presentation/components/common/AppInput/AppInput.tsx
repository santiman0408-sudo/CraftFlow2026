import React from "react";
import { Text, TextInput, View } from "react-native";

import { styles } from "./styles";
import { AppInputProps } from "./types";

export default function AppInput({
  label,
  error,
  containerStyle,
  inputStyle,
  ...props
}: AppInputProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <TextInput {...props} style={[styles.input, inputStyle]} />

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

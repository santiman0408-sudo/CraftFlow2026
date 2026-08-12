import React from "react";
import { TouchableOpacity, ActivityIndicator } from "react-native";

import { Colors } from "@/presentation/theme";
import AppText from "../AppText";

import { styles } from "./styles";
import { AppButtonProps } from "./types";

export default function AppButton({
  title,
  variant = "primary",
  loading = false,
  disabled,
  style,
  ...props
}: AppButtonProps) {
  const isOutline = variant === "outline";

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={loading || disabled}
      style={[
        styles.button,
        styles[variant],
        (loading || disabled) && styles.disabled,
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={isOutline ? Colors.primary : Colors.white} />
      ) : (
        <AppText
          style={{
            fontWeight: "bold",
            color: isOutline ? Colors.primary : Colors.white,
          }}
        >
          {title}
        </AppText>
      )}
    </TouchableOpacity>
  );
}

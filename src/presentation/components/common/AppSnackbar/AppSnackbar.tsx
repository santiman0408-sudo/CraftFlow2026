import React, { useEffect, useRef } from "react";

import { Animated, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import AppText from "@/presentation/components/common/AppText";

import { Colors } from "@/presentation/theme";

import { AppSnackbarProps } from "./types";

import { styles } from "./styles";

export default function AppSnackbar({
  visible,

  message,

  type = "info",

  duration = 3000,

  onHide,
}: AppSnackbarProps) {
  const translateY = useRef(new Animated.Value(120)).current;

  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) {
      return;
    }

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),

      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 120,
          duration: 250,
          useNativeDriver: true,
        }),

        Animated.timing(opacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onHide();
      });
    }, duration);

    return () => clearTimeout(timer);
  }, [visible, duration, onHide, opacity, translateY]);

  if (!visible) {
    return null;
  }

  function getBackgroundColor() {
    switch (type) {
      case "success":
        return "#16A34A";

      case "error":
        return "#DC2626";

      case "warning":
        return "#D97706";

      default:
        return Colors.primary;
    }
  }

  function getIcon(): keyof typeof Ionicons.glyphMap {
    switch (type) {
      case "success":
        return "checkmark-circle";

      case "error":
        return "close-circle";

      case "warning":
        return "warning";

      default:
        return "information-circle";
    }
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: getBackgroundColor(),
          opacity,
          transform: [
            {
              translateY,
            },
          ],
        },
      ]}
    >
      <Ionicons name={getIcon()} size={22} color="#FFF" />

      <View style={styles.text}>
        <AppText
          style={{
            color: "#FFF",
            fontWeight: "600",
          }}
        >
          {message}
        </AppText>
      </View>
    </Animated.View>
  );
}

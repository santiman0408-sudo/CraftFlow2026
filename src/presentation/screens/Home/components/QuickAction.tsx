import React from "react";

import { Pressable, StyleSheet, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import AppCard from "@/presentation/components/common/AppCard";
import AppText from "@/presentation/components/common/AppText";

import { Colors, Radius, Spacing } from "@/presentation/theme";

interface Props {
  title: string;

  onPress: () => void;
}

export default function QuickAction({ title, onPress }: Props) {
  function getIcon() {
    switch (title) {
      case "Nuevo Pedido":
        return "cart";

      case "Ver Pedidos":
        return "receipt";

      case "Clientes":
        return "people";

      case "Productos":
        return "cube";

      case "Categorías":
        return "pricetags";

      default:
        return "apps";
    }
  }

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{
        color: "#E5E7EB",
      }}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <AppCard>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Ionicons name={getIcon()} size={28} color={Colors.primary} />
          </View>

          <AppText bold center>
            {title}
          </AppText>
        </View>
      </AppCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },

  pressed: {
    opacity: 0.75,
  },

  content: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.md,
  },

  iconContainer: {
    width: 58,
    height: 58,
    borderRadius: Radius.full,
    backgroundColor: Colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
});

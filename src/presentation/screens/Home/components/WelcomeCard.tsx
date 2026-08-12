import React from "react";

import { StyleSheet, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import AppCard from "@/presentation/components/common/AppCard/AppCard";
import AppText from "@/presentation/components/common/AppText";

import { Colors, Radius, Spacing } from "@/presentation/theme";

export default function WelcomeCard() {
  const fechaActual = new Date().toLocaleDateString("es-PE", {
    timeZone: "America/Lima",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <AppCard>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="storefront"
              size={32}
              color={Colors.primary}
            />
          </View>

          <View style={styles.titleContainer}>
            <AppText variant="h2" bold>
              👋 Bienvenido
            </AppText>

            <AppText variant="title" color="primary" bold>
              CraftFlow
            </AppText>
          </View>
        </View>

        <AppText color="textSecondary">
          Gestiona pedidos artesanales de forma rápida,
          organizada y segura.
        </AppText>

        <View style={styles.footer}>
          <Ionicons
            name="calendar-outline"
            size={18}
            color={Colors.textSecondary}
          />

          <AppText color="textSecondary">
            {fechaActual}
          </AppText>
        </View>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.md,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: Radius.full,
    backgroundColor: Colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
  },

  titleContainer: {
    flex: 1,
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
});

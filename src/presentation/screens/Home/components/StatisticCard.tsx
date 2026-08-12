import React from "react";
import { StyleSheet, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import AppCard from "@/presentation/components/common/AppCard";
import AppText from "@/presentation/components/common/AppText";

import { Colors, Radius, Spacing } from "@/presentation/theme";

interface Props {
  title: string;

  value: number;

  icon?: "cube" | "time" | "checkmark-circle" | "cash";

  iconColor?: string;
}

export default function StatisticCard({
  title,
  value,
  icon = "cube",
  iconColor = Colors.primary,
}: Props) {
  return (
    <View style={styles.wrapper}>
      <AppCard>
        <View style={styles.container}>
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: Colors.primaryLight,
              },
            ]}
          >
            <Ionicons name={icon} size={28} color={iconColor} />
          </View>

          <AppText variant="title" bold>
            {value}
          </AppText>

          <AppText color="textSecondary" center>
            {title}
          </AppText>
        </View>
      </AppCard>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },

  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: Radius.full,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.xs,
  },
});

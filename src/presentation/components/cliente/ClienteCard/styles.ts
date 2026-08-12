import { StyleSheet } from "react-native";

import { Colors, Radius, Spacing } from "@/presentation/theme";

export const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },

  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  info: {
    flex: 1,
    gap: Spacing.xs,
    paddingRight: Spacing.md,
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
  },

  actionButton: {
    width: 42,
    height: 42,
    marginLeft: Spacing.sm,
    borderRadius: Radius.full,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
});

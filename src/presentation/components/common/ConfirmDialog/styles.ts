import { StyleSheet } from "react-native";

import { Colors, Radius, Spacing } from "@/presentation/theme";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.45)",
    padding: Spacing.lg,
  },

  container: {
    width: "100%",
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
  },

  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: Radius.full,
    backgroundColor: "#FEF3C7",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.md,
  },

  title: {
    textAlign: "center",
    marginBottom: Spacing.sm,
  },

  message: {
    textAlign: "center",
    marginBottom: Spacing.lg,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: Spacing.md,
  },

  button: {
    flex: 1,
  },
});

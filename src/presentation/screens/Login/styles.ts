import { StyleSheet } from "react-native";

import {
  Colors,
  Radius,
  Spacing,
} from "@/presentation/theme";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  keyboard: {
    flex: 1,
  },

  content: {
    flexGrow: 1,
    justifyContent: "center",
    padding: Spacing.lg,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: Spacing.xl,
  },

  subtitle: {
    marginTop: Spacing.sm,
    textAlign: "center",
  },

  card: {
    borderRadius: Radius.lg,
  },

  title: {
    textAlign: "center",
    marginBottom: Spacing.sm,
  },

  description: {
    textAlign: "center",
    marginBottom: Spacing.lg,
  },

  hint: {
    textAlign: "center",
    marginTop: Spacing.md,
    fontSize: 12,
  },
});
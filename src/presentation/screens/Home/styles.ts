import { StyleSheet } from "react-native";

import { Colors, Spacing } from "@/presentation/theme";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xl,
  },

  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
  },

  statistics: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: Spacing.md,
  },

  section: {
    marginTop: Spacing.lg,
  },

  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
});

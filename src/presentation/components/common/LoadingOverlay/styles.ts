import { StyleSheet } from "react-native";

import { Colors, Radius, Spacing } from "@/presentation/theme";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",

    backgroundColor: "rgba(0,0,0,0.35)",

    padding: Spacing.lg,
  },

  container: {
    width: 220,

    backgroundColor: Colors.surface,

    borderRadius: Radius.lg,

    padding: Spacing.xl,

    alignItems: "center",

    elevation: 8,

    shadowColor: "#000",

    shadowOpacity: 0.25,

    shadowRadius: 8,

    shadowOffset: {
      width: 0,

      height: 4,
    },
  },

  message: {
    marginTop: Spacing.lg,

    textAlign: "center",
  },
});

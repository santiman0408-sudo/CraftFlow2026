import { StyleSheet } from "react-native";

import { Radius, Spacing } from "@/presentation/theme";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",

    left: Spacing.lg,

    right: Spacing.lg,

    bottom: 32,

    borderRadius: Radius.lg,

    paddingVertical: Spacing.md,

    paddingHorizontal: Spacing.lg,

    flexDirection: "row",

    alignItems: "center",

    elevation: 6,

    shadowColor: "#000",

    shadowOpacity: 0.2,

    shadowRadius: 8,

    shadowOffset: {
      width: 0,

      height: 4,
    },
  },

  text: {
    flex: 1,

    marginLeft: Spacing.md,
  },
});

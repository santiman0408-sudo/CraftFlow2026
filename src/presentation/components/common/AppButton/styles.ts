import { StyleSheet } from "react-native";
import { Colors, Radius, Spacing } from "@/presentation/theme";

export const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: Spacing.sm,
  },

  text: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },

  primary: {
    backgroundColor: Colors.primary,
  },

  secondary: {
    backgroundColor: Colors.secondary,
  },

  outline: {
    backgroundColor: Colors.transparent,
    borderWidth: 2,
    borderColor: Colors.primary,
  },

  danger: {
    backgroundColor: Colors.error,
  },

  outlineText: {
    color: Colors.primary,
  },

  disabled: {
    opacity: 0.5,
  },
});

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    gap: 16,
    width: "100%",
  },

  totalContainer: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
  },

  buttons: {
    marginTop: 18,
    gap: 12,

    // Espacio adicional debajo de Cancelar.
    paddingBottom: 10,
  },
});

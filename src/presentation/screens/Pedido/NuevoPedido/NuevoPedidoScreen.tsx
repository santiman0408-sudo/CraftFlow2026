import React from "react";

import {
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";

import AppHeader from "@/presentation/components/common/AppHeader";
import AppSnackbar from "@/presentation/components/common/AppSnackbar";
import LoadingOverlay from "@/presentation/components/common/LoadingOverlay";

import PedidoForm from "@/presentation/components/pedido/PedidoForm";

import { usePedido } from "@/presentation/context";
import { useSnackbar } from "@/presentation/hooks/useSnackbar";

export default function NuevoPedidoScreen() {
  const navigation = useNavigation();

  const {
    createPedido,
    loading,
  } = usePedido();

  const snackbar = useSnackbar();

  async function handleSubmit(data: {
    clienteId: number;
    productoId: number;
    cantidad: number;
    precioUnitario: number;
    total: number;
    estado:
      | "PENDIENTE"
      | "EN_PROCESO"
      | "ENTREGADO"
      | "CANCELADO";
    fecha: string;
  }) {
    try {
      await createPedido(data);

      snackbar.success("Pedido registrado correctamente.");

      setTimeout(() => {
        navigation.goBack();
      }, 900);
    } catch (error) {
      snackbar.error(
        error instanceof Error
          ? error.message
          : "No se pudo registrar el pedido.",
      );
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <AppHeader
          title="Nuevo Pedido"
          showBackButton
          onBackPress={() => navigation.goBack()}
        />

        <View style={styles.formContainer}>
          <PedidoForm
            loading={loading}
            onSubmit={handleSubmit}
            onCancel={() => navigation.goBack()}
          />
        </View>
      </ScrollView>

      <LoadingOverlay
        visible={loading}
        message="Guardando pedido..."
      />

      <AppSnackbar
        visible={snackbar.visible}
        message={snackbar.message}
        type={snackbar.type}
        onHide={snackbar.hide}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  scrollView: {
    flex: 1,
  },

  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,

    // Espacio adicional para que Cancelar
    // no quede pegado ni cortado por el borde inferior.
    paddingBottom: 40,
  },

  formContainer: {
    width: "100%",
  },
});

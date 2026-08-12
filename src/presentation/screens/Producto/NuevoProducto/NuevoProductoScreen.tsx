import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";

import AppHeader from "@/presentation/components/common/AppHeader";
import AppSnackbar from "@/presentation/components/common/AppSnackbar";
import LoadingOverlay from "@/presentation/components/common/LoadingOverlay";

import ProductoForm from "@/presentation/components/producto/ProductoForm";

import { useProducto } from "@/presentation/context";
import { useSnackbar } from "@/presentation/hooks/useSnackbar";

export default function NuevoProductoScreen() {
  const navigation = useNavigation();

  const {
    createProducto,

    loading,
  } = useProducto();

  const snackbar = useSnackbar();

  async function handleSubmit(data: {
    nombre: string;

    precio: number;

    categoriaId: number;
  }) {
    try {
      await createProducto(data);

      snackbar.success("Producto registrado correctamente.");

      setTimeout(() => {
        navigation.goBack();
      }, 900);
    } catch (error) {
      snackbar.error(
        error instanceof Error
          ? error.message
          : "No se pudo registrar el producto.",
      );
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      <AppHeader
        title="Nuevo Producto"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <ProductoForm
        loading={loading}
        onSubmit={handleSubmit}
        onCancel={() => navigation.goBack()}
      />

      <LoadingOverlay visible={loading} message="Guardando producto..." />

      <AppSnackbar
        visible={snackbar.visible}
        message={snackbar.message}
        type={snackbar.type}
        onHide={snackbar.hide}
      />
    </SafeAreaView>
  );
}

import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { RootStackParamList } from "@/presentation/navigation/types";

import AppHeader from "@/presentation/components/common/AppHeader";
import AppText from "@/presentation/components/common/AppText";
import AppSnackbar from "@/presentation/components/common/AppSnackbar";
import LoadingOverlay from "@/presentation/components/common/LoadingOverlay";

import ProductoForm from "@/presentation/components/producto/ProductoForm";

import { useProducto } from "@/presentation/context";
import { useSnackbar } from "@/presentation/hooks/useSnackbar";

type Navigation = NavigationProp<RootStackParamList>;

type Route = RouteProp<RootStackParamList, "EditarProducto">;

export default function EditarProductoScreen() {
  const navigation = useNavigation<Navigation>();

  const route = useRoute<Route>();

  const { productoId } = route.params;

  const {
    getProducto,

    updateProducto,

    loading,
  } = useProducto();

  const snackbar = useSnackbar();

  const producto = getProducto(productoId);

  if (!producto) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          padding: 20,
        }}
      >
        <AppHeader
          title="Editar Producto"
          showBackButton
          onBackPress={() => navigation.goBack()}
        />

        <AppText>El producto no existe.</AppText>
      </SafeAreaView>
    );
  }

  async function handleSubmit(data: {
    nombre: string;

    precio: number;

    categoriaId: number;
  }) {
    try {
      await updateProducto({
        ...producto,

        ...data,
      });

      snackbar.success("Producto actualizado correctamente.");

      setTimeout(() => {
        navigation.goBack();
      }, 900);
    } catch (error) {
      snackbar.error(
        error instanceof Error
          ? error.message
          : "No se pudo actualizar el producto.",
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
        title="Editar Producto"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <ProductoForm
        initialValues={producto}
        loading={loading}
        onSubmit={handleSubmit}
        onCancel={() => navigation.goBack()}
      />

      <LoadingOverlay visible={loading} message="Actualizando producto..." />

      <AppSnackbar
        visible={snackbar.visible}
        message={snackbar.message}
        type={snackbar.type}
        onHide={snackbar.hide}
      />
    </SafeAreaView>
  );
}

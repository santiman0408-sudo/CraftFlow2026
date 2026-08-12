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

import PedidoForm from "@/presentation/components/pedido/PedidoForm";

import { usePedido } from "@/presentation/context";
import { useSnackbar } from "@/presentation/hooks/useSnackbar";

type Navigation = NavigationProp<RootStackParamList>;

type ScreenRoute = RouteProp<RootStackParamList, "EditarPedido">;

export default function EditarPedidoScreen() {
  const navigation = useNavigation<Navigation>();

  const route = useRoute<ScreenRoute>();

  const { pedidoId } = route.params;

  const {
    getPedido,

    updatePedido,

    loading,
  } = usePedido();

  const snackbar = useSnackbar();

  const pedido = getPedido(pedidoId);

  if (!pedido) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          padding: 20,
        }}
      >
        <AppHeader
          title="Editar Pedido"
          showBackButton
          onBackPress={() => navigation.goBack()}
        />

        <AppText>El pedido no existe.</AppText>
      </SafeAreaView>
    );
  }

  async function handleSubmit(data: {
    clienteId: number;

    productoId: number;

    cantidad: number;

    precioUnitario: number;

    total: number;

    estado: "PENDIENTE" | "EN_PROCESO" | "ENTREGADO" | "CANCELADO";

    fecha: string;
  }) {
    try {
      await updatePedido({
        ...pedido,

        ...data,
      });

      snackbar.success("Pedido actualizado correctamente.");

      setTimeout(() => {
        navigation.goBack();
      }, 900);
    } catch (error) {
      snackbar.error(
        error instanceof Error
          ? error.message
          : "No se pudo actualizar el pedido.",
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
        title="Editar Pedido"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <PedidoForm
        initialValues={pedido}
        loading={loading}
        onSubmit={handleSubmit}
        onCancel={() => navigation.goBack()}
      />

      <LoadingOverlay visible={loading} message="Actualizando pedido..." />

      <AppSnackbar
        visible={snackbar.visible}
        message={snackbar.message}
        type={snackbar.type}
        onHide={snackbar.hide}
      />
    </SafeAreaView>
  );
}

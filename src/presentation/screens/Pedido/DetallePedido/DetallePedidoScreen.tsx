import React, { useState } from "react";

import {
  ScrollView,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { RootStackParamList } from "@/presentation/navigation/types";

import {
  usePedido,
  useCliente,
  useProducto,
} from "@/presentation/context";

import { useSnackbar } from "@/presentation/hooks/useSnackbar";
import { useConfirmDialog } from "@/presentation/hooks/useConfirmDialog";

import AppHeader from "@/presentation/components/common/AppHeader";
import AppButton from "@/presentation/components/common/AppButton";
import AppCard from "@/presentation/components/common/AppCard";
import AppText from "@/presentation/components/common/AppText";
import MoneyCard from "@/presentation/components/common/MoneyCard";
import AppSnackbar from "@/presentation/components/common/AppSnackbar";
import ConfirmDialog from "@/presentation/components/common/ConfirmDialog";
import LoadingOverlay from "@/presentation/components/common/LoadingOverlay";

import { styles } from "./styles";

type Navigation = NavigationProp<RootStackParamList>;

type ScreenRoute = RouteProp<
  RootStackParamList,
  "DetallePedido"
>;

export default function DetallePedidoScreen() {
  const navigation = useNavigation<Navigation>();

  const route = useRoute<ScreenRoute>();

  const { pedidoId } = route.params;

  const {
    getPedido,
    deletePedido,
  } = usePedido();

  const { getCliente } = useCliente();

  const { getProducto } = useProducto();

  const snackbar = useSnackbar();

  const confirm = useConfirmDialog();

  const [deleting, setDeleting] = useState(false);

  const pedido = getPedido(pedidoId);

  /*
   * Si el pedido no existe, mostramos un estado
   * controlado en lugar de intentar acceder a sus propiedades.
   */
  if (!pedido) {
    return (
      <SafeAreaView style={styles.container}>
        <AppHeader
          title="Detalle Pedido"
          showBackButton
          onBackPress={() => navigation.goBack()}
        />

        <View style={styles.emptyContainer}>
          <AppText variant="title" bold>
            Pedido no encontrado
          </AppText>

          <AppText style={styles.emptyMessage}>
            El pedido no existe o fue eliminado.
          </AppText>

          <AppButton
            title="Volver"
            variant="outline"
            onPress={() => navigation.goBack()}
          />
        </View>
      </SafeAreaView>
    );
  }

  const cliente = getCliente(pedido.clienteId);

  const producto = getProducto(pedido.productoId);

  async function handleDelete() {
    if (confirm.selectedId === null) {
      return;
    }

    try {
      setDeleting(true);

      await deletePedido(confirm.selectedId);

      confirm.close();

      snackbar.success(
        "Pedido eliminado correctamente."
      );

      setTimeout(() => {
        navigation.navigate("ListaPedidos");
      }, 900);
    } catch {
      snackbar.error(
        "No se pudo eliminar el pedido."
      );
    } finally {
      setDeleting(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title="Detalle Pedido"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <AppCard style={styles.card}>
          {/* Cliente */}
          <View style={styles.section}>
            <AppText variant="title" bold>
              👤 Cliente
            </AppText>

            <AppText>
              {cliente?.nombre ?? "Cliente eliminado"}
            </AppText>
          </View>

          {/* Producto */}
          <View style={styles.section}>
            <AppText variant="title" bold>
              📦 Producto
            </AppText>

            <AppText>
              {producto?.nombre ?? "Producto eliminado"}
            </AppText>
          </View>

          {/* Cantidad */}
          <View style={styles.section}>
            <AppText variant="title" bold>
              🔢 Cantidad
            </AppText>

            <AppText>
              {pedido.cantidad}
            </AppText>
          </View>

          {/* Precio unitario */}
          <View style={styles.section}>
            <AppText variant="title" bold>
              💲 Precio Unitario
            </AppText>

            <AppText>
              S/ {pedido.precioUnitario.toFixed(2)}
            </AppText>
          </View>

          {/* Estado */}
          <View style={styles.section}>
            <AppText variant="title" bold>
              📌 Estado
            </AppText>

            <AppText>
              {pedido.estado}
            </AppText>
          </View>

          {/* Fecha */}
          <View style={styles.section}>
            <AppText variant="title" bold>
              📅 Fecha
            </AppText>

            <AppText>
              {new Date(
                pedido.fecha
              ).toLocaleDateString()}
            </AppText>
          </View>
        </AppCard>

        {/* Total */}
        <MoneyCard
          title="Total del Pedido"
          amount={pedido.total}
        />

        {/* Editar */}
        <AppButton
          title="Editar Pedido"
          onPress={() =>
            navigation.navigate("EditarPedido", {
              pedidoId: pedido.id!,
            })
          }
        />

        {/* Eliminar */}
        <AppButton
          title="Eliminar Pedido"
          variant="danger"
          onPress={() =>
            confirm.open(pedido.id!)
          }
        />

        {/* Volver */}
        <AppButton
          title="Volver"
          variant="outline"
          onPress={() => navigation.goBack()}
        />
      </ScrollView>

      {/* Confirmación de eliminación */}
      <ConfirmDialog
        visible={confirm.visible}
        title="Eliminar pedido"
        message={
          "¿Está seguro de eliminar este pedido? " +
          "Esta acción no se puede deshacer."
        }
        loading={deleting}
        onCancel={confirm.close}
        onConfirm={handleDelete}
      />

      {/* Indicador de carga */}
      <LoadingOverlay
        visible={deleting}
        message="Eliminando pedido..."
      />

      {/* Snackbar */}
      <AppSnackbar
        visible={snackbar.visible}
        message={snackbar.message}
        type={snackbar.type}
        onHide={snackbar.hide}
      />
    </SafeAreaView>
  );
}

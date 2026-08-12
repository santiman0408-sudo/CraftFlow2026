import { useEffect, useState } from "react";

import { FlatList, StyleSheet, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { NavigationProp, useNavigation } from "@react-navigation/native";

import { RootStackParamList } from "@/presentation/navigation/types";

import { usePedido, useCliente, useProducto } from "@/presentation/context";

import { useSnackbar } from "@/presentation/hooks/useSnackbar";
import { useConfirmDialog } from "@/presentation/hooks/useConfirmDialog";

import AppHeader from "@/presentation/components/common/AppHeader";
import AppButton from "@/presentation/components/common/AppButton";
import Loader from "@/presentation/components/common/Loader";
import EmptyState from "@/presentation/components/common/EmptyState";
import ConfirmDialog from "@/presentation/components/common/ConfirmDialog";
import AppSnackbar from "@/presentation/components/common/AppSnackbar";
import LoadingOverlay from "@/presentation/components/common/LoadingOverlay";

import PedidoCard from "@/presentation/components/pedido/PedidoCard";

export default function ListaPedidosScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {
    pedidos,

    loading,

    refreshPedidos,

    deletePedido,
  } = usePedido();

  const { getCliente } = useCliente();

  const { getProducto } = useProducto();

  const snackbar = useSnackbar();

  const confirm = useConfirmDialog();

  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    refreshPedidos();
  }, []);

  async function handleDelete() {
    if (confirm.selectedId === null) {
      return;
    }

    try {
      setDeleting(true);

      await deletePedido(confirm.selectedId);

      confirm.close();

      snackbar.success("Pedido eliminado correctamente.");
    } catch {
      snackbar.error("No se pudo eliminar el pedido.");
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return <Loader message="Cargando pedidos..." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title="Pedidos"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <FlatList
        data={pedidos}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        refreshing={loading}
        onRefresh={refreshPedidos}
        initialNumToRender={10}
        windowSize={7}
        maxToRenderPerBatch={10}
        removeClippedSubviews
        renderItem={({ item }) => {
          const cliente = getCliente(item.clienteId);

          const producto = getProducto(item.productoId);

          return (
            <PedidoCard
              pedido={item}

              cliente={cliente?.nombre ?? "Cliente eliminado"}

              producto={producto?.nombre ?? "Producto eliminado"}

              onPress={() =>
                navigation.navigate("DetallePedido", {
                  pedidoId: item.id!,
                })
              }

              onEdit={() =>
                navigation.navigate("EditarPedido", {
                  pedidoId: item.id!,
                })
              }

              onDelete={() => confirm.open(item.id!)}
            />
          );
        }}

        ListEmptyComponent={
          <EmptyState
            title="No existen pedidos"
            description="Presione el botón para registrar el primer pedido."
          />
        }
      />

      <View style={styles.footer}>
        <AppButton
          title="Nuevo Pedido"
          onPress={() => navigation.navigate("NuevoPedido")}
        />
      </View>

      <ConfirmDialog
        visible={confirm.visible}
        title="Eliminar pedido"
        message="¿Está seguro de eliminar este pedido? Esta acción no se puede deshacer."
        loading={deleting}
        onCancel={confirm.close}
        onConfirm={handleDelete}
      />

      <LoadingOverlay visible={deleting} message="Eliminando pedido..." />

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
  container: {
    flex: 1,
  },

  list: {
    flexGrow: 1,
    padding: 16,
  },

  footer: {
    padding: 16,
  },
});

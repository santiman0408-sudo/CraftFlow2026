import { useEffect, useState } from "react";

import { FlatList, StyleSheet, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { NavigationProp, useNavigation } from "@react-navigation/native";

import { RootStackParamList } from "@/presentation/navigation/types";

import { useCliente } from "@/presentation/context";

import { useConfirmDialog } from "@/presentation/hooks/useConfirmDialog";

import { useSnackbar } from "@/presentation/hooks/useSnackbar";

import AppHeader from "@/presentation/components/common/AppHeader";
import AppButton from "@/presentation/components/common/AppButton";
import ConfirmDialog from "@/presentation/components/common/ConfirmDialog";
import AppSnackbar from "@/presentation/components/common/AppSnackbar";
import LoadingOverlay from "@/presentation/components/common/LoadingOverlay";
import Loader from "@/presentation/components/common/Loader";
import EmptyState from "@/presentation/components/common/EmptyState";

import ClienteCard from "@/presentation/components/cliente/ClienteCard";

export default function ListaClientesScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {
    clientes,

    loading,

    refreshClientes,

    deleteCliente,
  } = useCliente();

  const confirm = useConfirmDialog();

  const snackbar = useSnackbar();

  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    refreshClientes();
  }, []);

  async function handleDelete() {
    if (confirm.selectedId === null) {
      return;
    }

    try {
      setDeleting(true);

      await deleteCliente(confirm.selectedId);

      confirm.close();

      snackbar.success("Cliente eliminado correctamente.");
    } catch {
      snackbar.error("No se pudo eliminar el cliente.");
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return <Loader message="Cargando clientes..." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title="Clientes"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <FlatList
        data={clientes}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        refreshing={loading}
        onRefresh={refreshClientes}
        renderItem={({ item }) => (
          <ClienteCard
            cliente={item}

            onPress={() =>
              navigation.navigate("DetalleCliente", {
                clienteId: item.id!,
              })
            }

            onEdit={() =>
              navigation.navigate("EditarCliente", {
                clienteId: item.id!,
              })
            }

            onDelete={() => confirm.open(item.id!)}
          />
        )}

        ListEmptyComponent={
          <EmptyState
            title="No existen clientes"
            description="Presione el botón para registrar el primer cliente."
          />
        }
      />

      <View style={styles.footer}>
        <AppButton
          title="Nuevo Cliente"
          onPress={() => navigation.navigate("NuevoCliente")}
        />
      </View>

      <ConfirmDialog
        visible={confirm.visible}

        title="Eliminar cliente"

        message="¿Está seguro de eliminar este cliente? Esta acción no se puede deshacer."

        loading={deleting}

        onCancel={confirm.close}

        onConfirm={handleDelete}
      />

      <LoadingOverlay
        visible={deleting}

        message="Eliminando cliente..."
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

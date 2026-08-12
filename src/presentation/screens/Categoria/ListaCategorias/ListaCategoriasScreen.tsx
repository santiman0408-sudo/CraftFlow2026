import { useEffect, useState } from "react";

import { FlatList, StyleSheet, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { NavigationProp, useNavigation } from "@react-navigation/native";

import { RootStackParamList } from "@/presentation/navigation/types";

import { useCategoria } from "@/presentation/context";

import { useSnackbar } from "@/presentation/hooks/useSnackbar";

import { useConfirmDialog } from "@/presentation/hooks/useConfirmDialog";

import AppHeader from "@/presentation/components/common/AppHeader";
import AppButton from "@/presentation/components/common/AppButton";
import Loader from "@/presentation/components/common/Loader";
import EmptyState from "@/presentation/components/common/EmptyState";
import ConfirmDialog from "@/presentation/components/common/ConfirmDialog";
import AppSnackbar from "@/presentation/components/common/AppSnackbar";
import LoadingOverlay from "@/presentation/components/common/LoadingOverlay";

import CategoriaCard from "@/presentation/components/categoria/CategoriaCard";

export default function ListaCategoriasScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {
    categorias,

    loading,

    refreshCategorias,

    deleteCategoria,
  } = useCategoria();

  const snackbar = useSnackbar();

  const confirm = useConfirmDialog();

  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    refreshCategorias();
  }, []);

  async function handleDelete() {
    if (confirm.selectedId === null) {
      return;
    }

    try {
      setDeleting(true);

      await deleteCategoria(confirm.selectedId);

      confirm.close();

      snackbar.success("Categoría eliminada correctamente.");
    } catch {
      snackbar.error("No se pudo eliminar la categoría.");
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return <Loader message="Cargando categorías..." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title="Categorías"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <FlatList
        data={categorias}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        refreshing={loading}
        onRefresh={refreshCategorias}
        renderItem={({ item }) => (
          <CategoriaCard
            categoria={item}

            onPress={() =>
              navigation.navigate("DetalleCategoria", {
                categoriaId: item.id!,
              })
            }

            onEdit={() =>
              navigation.navigate("EditarCategoria", {
                categoriaId: item.id!,
              })
            }

            onDelete={() => confirm.open(item.id!)}
          />
        )}

        ListEmptyComponent={
          <EmptyState
            title="No existen categorías"
            description="Presione el botón para registrar la primera categoría."
          />
        }
      />

      <View style={styles.footer}>
        <AppButton
          title="Nueva Categoría"
          onPress={() => navigation.navigate("NuevaCategoria")}
        />
      </View>

      <ConfirmDialog
        visible={confirm.visible}
        title="Eliminar categoría"
        message="¿Está seguro de eliminar esta categoría? Esta acción no se puede deshacer."
        loading={deleting}
        onCancel={confirm.close}
        onConfirm={handleDelete}
      />

      <LoadingOverlay visible={deleting} message="Eliminando categoría..." />

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

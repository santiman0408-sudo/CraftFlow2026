import { useEffect, useMemo, useState } from "react";

import { FlatList, StyleSheet, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { NavigationProp, useNavigation } from "@react-navigation/native";

import { RootStackParamList } from "@/presentation/navigation/types";

import { useProducto, useCategoria } from "@/presentation/context";

import { useSnackbar } from "@/presentation/hooks/useSnackbar";
import { useConfirmDialog } from "@/presentation/hooks/useConfirmDialog";

import AppHeader from "@/presentation/components/common/AppHeader";
import AppButton from "@/presentation/components/common/AppButton";
import Loader from "@/presentation/components/common/Loader";
import EmptyState from "@/presentation/components/common/EmptyState";
import ConfirmDialog from "@/presentation/components/common/ConfirmDialog";
import AppSnackbar from "@/presentation/components/common/AppSnackbar";
import LoadingOverlay from "@/presentation/components/common/LoadingOverlay";

import ProductoCard from "@/presentation/components/producto/ProductoCard";

export default function ListaProductosScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { productos, loading, refreshProductos, deleteProducto } =
    useProducto();

  const { categorias } = useCategoria();

  const snackbar = useSnackbar();

  const confirm = useConfirmDialog();

  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    refreshProductos();
  }, []);

  const categoriasMap = useMemo(() => {
    return categorias.reduce(
      (acc, categoria) => {
        acc[categoria.id!] = categoria.nombre;

        return acc;
      },

      {} as Record<number, string>,
    );
  }, [categorias]);

  async function handleDelete() {
    if (confirm.selectedId === null) {
      return;
    }

    try {
      setDeleting(true);

      await deleteProducto(confirm.selectedId);

      confirm.close();

      snackbar.success("Producto eliminado correctamente.");
    } catch {
      snackbar.error("No se pudo eliminar el producto.");
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return <Loader message="Cargando productos..." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title="Productos"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <FlatList
        data={productos}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        refreshing={loading}
        onRefresh={refreshProductos}
        renderItem={({ item }) => (
          <ProductoCard
            producto={item}

            categoria={categoriasMap[item.categoriaId] ?? "Sin categoría"}

            onPress={() =>
              navigation.navigate("DetalleProducto", {
                productoId: item.id!,
              })
            }

            onEdit={() =>
              navigation.navigate("EditarProducto", {
                productoId: item.id!,
              })
            }

            onDelete={() => confirm.open(item.id!)}
          />
        )}

        ListEmptyComponent={
          <EmptyState
            title="No existen productos"
            description="Presione el botón para registrar el primer producto."
          />
        }
      />

      <View style={styles.footer}>
        <AppButton
          title="Nuevo Producto"
          onPress={() => navigation.navigate("NuevoProducto")}
        />
      </View>

      <ConfirmDialog
        visible={confirm.visible}
        title="Eliminar producto"
        message="¿Está seguro de eliminar este producto? Esta acción no se puede deshacer."
        loading={deleting}
        onCancel={confirm.close}
        onConfirm={handleDelete}
      />

      <LoadingOverlay visible={deleting} message="Eliminando producto..." />

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

import React, { useState } from "react";

import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { RootStackParamList } from "@/presentation/navigation/types";

import { useCategoria } from "@/presentation/context";

import { useSnackbar } from "@/presentation/hooks/useSnackbar";
import { useConfirmDialog } from "@/presentation/hooks/useConfirmDialog";

import AppHeader from "@/presentation/components/common/AppHeader";
import AppButton from "@/presentation/components/common/AppButton";
import AppCard from "@/presentation/components/common/AppCard";
import AppText from "@/presentation/components/common/AppText";
import AppSnackbar from "@/presentation/components/common/AppSnackbar";
import ConfirmDialog from "@/presentation/components/common/ConfirmDialog";
import LoadingOverlay from "@/presentation/components/common/LoadingOverlay";

import { styles } from "./styles";

type Navigation = NavigationProp<RootStackParamList>;

type ScreenRouteProp = RouteProp<RootStackParamList, "DetalleCategoria">;

export default function DetalleCategoriaScreen() {
  const navigation = useNavigation<Navigation>();

  const route = useRoute<ScreenRouteProp>();

  const { categoriaId } = route.params;

  const {
    getCategoria,

    deleteCategoria,
  } = useCategoria();

  const categoria = getCategoria(categoriaId);

  const snackbar = useSnackbar();

  const confirm = useConfirmDialog();

  const [deleting, setDeleting] = useState(false);

  if (!categoria) {
    return (
      <SafeAreaView style={styles.container}>
        <AppHeader
          title="Detalle Categoría"
          showBackButton
          onBackPress={() => navigation.goBack()}
        />

        <AppText>La categoría no existe.</AppText>
      </SafeAreaView>
    );
  }

  async function handleDelete() {
    if (confirm.selectedId === null) {
      return;
    }

    try {
      setDeleting(true);

      await deleteCategoria(confirm.selectedId);

      confirm.close();

      snackbar.success("Categoría eliminada correctamente.");

      setTimeout(() => {
        navigation.navigate("ListaCategorias");
      }, 900);
    } catch {
      snackbar.error("No se pudo eliminar la categoría.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title="Detalle Categoría"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <View style={styles.content}>
        <AppCard style={styles.card}>
          <View style={styles.section}>
            <AppText variant="title" bold>
              🗂 Nombre
            </AppText>

            <AppText>{categoria.nombre}</AppText>
          </View>
        </AppCard>

        <View style={styles.actions}>
          <AppButton
            title="Editar Categoría"
            onPress={() =>
              navigation.navigate("EditarCategoria", {
                categoriaId: categoria.id!,
              })
            }
          />

          <AppButton
            title="Eliminar Categoría"
            variant="danger"
            onPress={() => confirm.open(categoria.id!)}
          />

          <AppButton
            title="Volver"
            variant="outline"
            onPress={() => navigation.goBack()}
          />
        </View>
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

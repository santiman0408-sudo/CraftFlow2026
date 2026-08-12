import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";

import AppHeader from "@/presentation/components/common/AppHeader";
import AppSnackbar from "@/presentation/components/common/AppSnackbar";
import LoadingOverlay from "@/presentation/components/common/LoadingOverlay";

import CategoriaForm from "@/presentation/components/categoria/CategoriaForm";

import { useCategoria } from "@/presentation/context";
import { useSnackbar } from "@/presentation/hooks/useSnackbar";

export default function NuevaCategoriaScreen() {
  const navigation = useNavigation();

  const {
    createCategoria,

    loading,
  } = useCategoria();

  const snackbar = useSnackbar();

  async function handleSubmit(data: { nombre: string }) {
    try {
      await createCategoria(data);

      snackbar.success("Categoría registrada correctamente.");

      setTimeout(() => {
        navigation.goBack();
      }, 900);
    } catch (error) {
      snackbar.error(
        error instanceof Error
          ? error.message
          : "No se pudo registrar la categoría.",
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
        title="Nueva Categoría"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <CategoriaForm
        loading={loading}
        onSubmit={handleSubmit}
        onCancel={() => navigation.goBack()}
      />

      <LoadingOverlay visible={loading} message="Guardando categoría..." />

      <AppSnackbar
        visible={snackbar.visible}
        message={snackbar.message}
        type={snackbar.type}
        onHide={snackbar.hide}
      />
    </SafeAreaView>
  );
}

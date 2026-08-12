import React from "react";

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

import AppHeader from "@/presentation/components/common/AppHeader";
import AppText from "@/presentation/components/common/AppText";
import AppSnackbar from "@/presentation/components/common/AppSnackbar";
import LoadingOverlay from "@/presentation/components/common/LoadingOverlay";

import CategoriaForm from "@/presentation/components/categoria/CategoriaForm";

type Navigation = NavigationProp<RootStackParamList>;

type ScreenRouteProp = RouteProp<RootStackParamList, "EditarCategoria">;

export default function EditarCategoriaScreen() {
  const navigation = useNavigation<Navigation>();

  const route = useRoute<ScreenRouteProp>();

  const { categoriaId } = route.params;

  const {
    getCategoria,

    updateCategoria,

    loading,
  } = useCategoria();

  const snackbar = useSnackbar();

  const categoria = getCategoria(categoriaId);

  if (!categoria) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          padding: 20,
        }}
      >
        <AppHeader
          title="Editar Categoría"
          showBackButton
          onBackPress={() => navigation.goBack()}
        />

        <AppText>La categoría no existe.</AppText>
      </SafeAreaView>
    );
  }

  async function handleSubmit(data: { nombre: string }) {
    try {
      await updateCategoria({
        ...categoria,

        nombre: data.nombre,
      });

      snackbar.success("Categoría actualizada correctamente.");

      setTimeout(() => {
        navigation.goBack();
      }, 900);
    } catch (error) {
      snackbar.error(
        error instanceof Error
          ? error.message
          : "No se pudo actualizar la categoría.",
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
        title="Editar Categoría"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <CategoriaForm
        initialValues={categoria}
        loading={loading}
        onSubmit={handleSubmit}
        onCancel={() => navigation.goBack()}
      />

      <LoadingOverlay visible={loading} message="Actualizando categoría..." />

      <AppSnackbar
        visible={snackbar.visible}
        message={snackbar.message}
        type={snackbar.type}
        onHide={snackbar.hide}
      />
    </SafeAreaView>
  );
}

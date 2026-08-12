import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";

import AppHeader from "@/presentation/components/common/AppHeader";
import AppSnackbar from "@/presentation/components/common/AppSnackbar";
import LoadingOverlay from "@/presentation/components/common/LoadingOverlay";

import ClienteForm from "@/presentation/components/cliente/ClienteForm";

import { useCliente } from "@/presentation/context";

import { useSnackbar } from "@/presentation/hooks/useSnackbar";

export default function NuevoClienteScreen() {
  const navigation = useNavigation();

  const {
    createCliente,

    loading,
  } = useCliente();

  const snackbar = useSnackbar();

  async function handleSubmit(data: {
    nombre: string;

    telefono: string;

    direccion: string;
  }) {
    try {
      await createCliente(data);

      snackbar.success("Cliente registrado correctamente.");

      setTimeout(() => {
        navigation.goBack();
      }, 900);
    } catch {
      snackbar.error("No se pudo registrar el cliente.");
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
        title="Nuevo Cliente"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <ClienteForm
        loading={loading}
        onSubmit={handleSubmit}
        onCancel={() => navigation.goBack()}
      />

      <LoadingOverlay visible={loading} message="Guardando cliente..." />

      <AppSnackbar
        visible={snackbar.visible}
        message={snackbar.message}
        type={snackbar.type}
        onHide={snackbar.hide}
      />
    </SafeAreaView>
  );
}

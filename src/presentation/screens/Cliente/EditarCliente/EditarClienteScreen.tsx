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

import ClienteForm from "@/presentation/components/cliente/ClienteForm";

import { useCliente } from "@/presentation/context";

import { useSnackbar } from "@/presentation/hooks/useSnackbar";

type Navigation = NavigationProp<RootStackParamList>;

type Route = RouteProp<RootStackParamList, "EditarCliente">;

export default function EditarClienteScreen() {
  const navigation = useNavigation<Navigation>();

  const route = useRoute<Route>();

  const { clienteId } = route.params;

  const {
    getCliente,

    updateCliente,

    loading,
  } = useCliente();

  const snackbar = useSnackbar();

  const cliente = getCliente(clienteId);

  if (!cliente) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          padding: 20,
        }}
      >
        <AppHeader
          title="Editar Cliente"
          showBackButton
          onBackPress={() => navigation.goBack()}
        />

        <AppText>El cliente no existe.</AppText>
      </SafeAreaView>
    );
  }

  async function handleSubmit(data: {
    nombre: string;

    telefono: string;

    direccion: string;
  }) {
    try {
      await updateCliente({
        ...cliente,

        ...data,
      });

      snackbar.success("Cliente actualizado correctamente.");

      setTimeout(() => {
        navigation.goBack();
      }, 900);
    } catch {
      snackbar.error("No se pudo actualizar el cliente.");
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
        title="Editar Cliente"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <ClienteForm
        initialValues={cliente}
        loading={loading}
        onSubmit={handleSubmit}
        onCancel={() => navigation.goBack()}
      />

      <LoadingOverlay visible={loading} message="Actualizando cliente..." />

      <AppSnackbar
        visible={snackbar.visible}
        message={snackbar.message}
        type={snackbar.type}
        onHide={snackbar.hide}
      />
    </SafeAreaView>
  );
}

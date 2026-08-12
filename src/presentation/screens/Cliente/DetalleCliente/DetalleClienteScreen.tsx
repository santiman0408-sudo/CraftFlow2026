import { Alert, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { RootStackParamList } from "@/presentation/navigation/types";

import { useCliente } from "@/presentation/context";

import AppHeader from "@/presentation/components/common/AppHeader";
import AppCard from "@/presentation/components/common/AppCard";
import AppButton from "@/presentation/components/common/AppButton";
import AppText from "@/presentation/components/common/AppText";

import { styles } from "./styles";

type Navigation = NavigationProp<RootStackParamList>;

type Route = RouteProp<RootStackParamList, "DetalleCliente">;

export default function DetalleClienteScreen() {
  const navigation = useNavigation<Navigation>();

  const route = useRoute<Route>();

  const { clienteId } = route.params;

  const { getCliente, deleteCliente } = useCliente();

  const cliente = getCliente(clienteId);

  if (!cliente) {
    return (
      <SafeAreaView style={styles.container}>
        <AppHeader
          title="Detalle Cliente"
          showBackButton
          onBackPress={() => navigation.goBack()}
        />

        <AppText>El cliente no existe.</AppText>
      </SafeAreaView>
    );
  }

  async function confirmDelete() {
    const clienteId = cliente?.id;
    if (!clienteId) return;

    Alert.alert(
      "Eliminar Cliente",
      "¿Está seguro que desea eliminar este cliente?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",

          onPress: async () => {
            try {
              await deleteCliente(clienteId);

              Alert.alert("Éxito", "Cliente eliminado correctamente.", [
                {
                  text: "OK",
                  onPress: () => navigation.navigate("ListaClientes"),
                },
              ]);
            } catch {
              Alert.alert("Error", "No fue posible eliminar el cliente.");
            }
          },
        },
      ],
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title="Detalle Cliente"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <View style={styles.content}>
        <AppCard style={styles.card}>
          <View style={styles.section}>
            <AppText variant="title" bold>
              👤 Nombre
            </AppText>

            <AppText>{cliente.nombre}</AppText>
          </View>

          <View style={styles.section}>
            <AppText variant="title" bold>
              📞 Teléfono
            </AppText>

            <AppText>{cliente.telefono}</AppText>
          </View>

          <View style={styles.section}>
            <AppText variant="title" bold>
              📍 Dirección
            </AppText>

            <AppText>{cliente.direccion}</AppText>
          </View>
        </AppCard>

        <View style={styles.actions}>
          <AppButton
            title="Editar Cliente"
            onPress={() =>
              navigation.navigate("EditarCliente", {
                clienteId: cliente.id!,
              })
            }
          />

          <AppButton
            title="Eliminar Cliente"
            variant="danger"
            onPress={confirmDelete}
          />

          <AppButton
            title="Volver"
            variant="outline"
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

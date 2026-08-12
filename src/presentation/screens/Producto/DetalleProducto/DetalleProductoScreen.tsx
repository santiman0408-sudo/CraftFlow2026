import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { RootStackParamList } from "@/presentation/navigation/types";

import AppHeader from "@/presentation/components/common/AppHeader";
import AppButton from "@/presentation/components/common/AppButton";
import AppCard from "@/presentation/components/common/AppCard";
import AppText from "@/presentation/components/common/AppText";

import { useProducto, useCategoria } from "@/presentation/context";

import { styles } from "./styles";

type Navigation = NavigationProp<RootStackParamList>;

type Route = RouteProp<RootStackParamList, "DetalleProducto">;

export default function DetalleProductoScreen() {
  const navigation = useNavigation<Navigation>();

  const route = useRoute<Route>();

  const { productoId } = route.params;

  const { getProducto, deleteProducto } = useProducto();

  const { getCategoria } = useCategoria();

  const producto = getProducto(productoId);

  if (!producto) {
    return (
      <SafeAreaView style={styles.container}>
        <AppHeader
          title="Detalle Producto"
          showBackButton
          onBackPress={() => navigation.goBack()}
        />

        <AppText>El producto no existe.</AppText>
      </SafeAreaView>
    );
  }

  const categoria = getCategoria(producto.categoriaId);

  async function handleDelete() {
    Alert.alert(
      "Eliminar Producto",
      "¿Está seguro que desea eliminar este producto?",
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
              await deleteProducto(producto?.id!);

              Alert.alert("Éxito", "Producto eliminado correctamente.", [
                {
                  text: "OK",
                  onPress: () => navigation.goBack(),
                },
              ]);
            } catch (error) {
              Alert.alert(
                "Error",
                error instanceof Error
                  ? error.message
                  : "No se pudo eliminar el producto.",
              );
            }
          },
        },
      ],
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title="Detalle Producto"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <AppCard style={styles.card}>
        <AppText variant="title" bold>
          📦 Producto
        </AppText>

        <AppText>{producto.nombre}</AppText>

        <AppText variant="title" bold>
          💰 Precio
        </AppText>

        <AppText>S/ {producto.precio.toFixed(2)}</AppText>

        <AppText variant="title" bold>
          🏷️ Categoría
        </AppText>

        <AppText>{categoria?.nombre ?? "Sin categoría"}</AppText>
      </AppCard>

      <AppButton
        title="Editar Producto"
        onPress={() =>
          navigation.navigate("EditarProducto", {
            productoId: producto.id!,
          })
        }
      />

      <AppButton
        title="Eliminar Producto"
        variant="danger"
        onPress={handleDelete}
      />

      <AppButton
        title="Volver"
        variant="outline"
        onPress={() => navigation.goBack()}
      />
    </SafeAreaView>
  );
}

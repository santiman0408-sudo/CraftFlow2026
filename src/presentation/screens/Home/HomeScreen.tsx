import React, { useEffect } from "react";

import { Pressable, ScrollView, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import {
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";

import { RootStackParamList } from "@/presentation/navigation/types";

import {
  useAuth,
  useDashboard,
} from "@/presentation/context";

import AppHeader from "@/presentation/components/common/AppHeader";
import AppText from "@/presentation/components/common/AppText";

import WelcomeCard from "./components/WelcomeCard";
import StatisticCard from "./components/StatisticCard";
import SummaryCard from "./components/SummaryCard";
import QuickAction from "./components/QuickAction";
import LatestPedidoCard from "./components/LatestPedidoCard";

import { Colors } from "@/presentation/theme";

import { styles } from "./styles";

export default function HomeScreen() {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList>>();

  const {
    dashboard,
    business,
    latestPedidos,
    refreshDashboard,
  } = useDashboard();

  const { logout, user } = useAuth();

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      "focus",
      refreshDashboard,
    );

    return unsubscribe;
  }, [navigation, refreshDashboard]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader
        title="CraftFlow"
        subtitle={
          user
            ? `Usuario: ${user.username}`
            : undefined
        }
        rightComponent={
          <Pressable
            onPress={logout}
            accessibilityRole="button"
            accessibilityLabel="Cerrar sesión"
            hitSlop={8}
            style={styles.logoutButton}
          >
            <Ionicons
              name="log-out-outline"
              size={24}
              color={Colors.primary}
            />

            <AppText
              variant="caption"
              color="primary"
              bold
            >
              Salir
            </AppText>
          </Pressable>
        }
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <WelcomeCard />

        <View style={styles.statistics}>
          <StatisticCard
            title="Pedidos"
            value={dashboard.totalPedidos}
            icon="cube"
          />

          <StatisticCard
            title="Pendientes"
            value={dashboard.pedidosPendientes}
            icon="time"
          />
        </View>

        <View style={styles.section}>
          <SummaryCard summary={business} />
        </View>

        <View style={styles.section}>
          <AppText
            variant="title"
            bold
            style={{
              marginBottom: 16,
            }}
          >
            Acciones rápidas
          </AppText>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                width: "48%",
              }}
            >
              <QuickAction
                title="Nuevo Pedido"
                onPress={() =>
                  navigation.navigate("NuevoPedido")
                }
              />
            </View>

            <View
              style={{
                width: "48%",
              }}
            >
              <QuickAction
                title="Ver Pedidos"
                onPress={() =>
                  navigation.navigate("ListaPedidos")
                }
              />
            </View>

            <View
              style={{
                width: "48%",
              }}
            >
              <QuickAction
                title="Clientes"
                onPress={() =>
                  navigation.navigate("ListaClientes")
                }
              />
            </View>

            <View
              style={{
                width: "48%",
              }}
            >
              <QuickAction
                title="Productos"
                onPress={() =>
                  navigation.navigate("ListaProductos")
                }
              />
            </View>

            <View
              style={{
                width: "48%",
              }}
            >
              <QuickAction
                title="Categorías"
                onPress={() =>
                  navigation.navigate("ListaCategorias")
                }
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <AppText variant="title" bold>
              Últimos pedidos
            </AppText>

            <Pressable
              onPress={() =>
                navigation.navigate("ListaPedidos")
              }
            >
              <AppText color="primary" bold>
                Ver todos
              </AppText>
            </Pressable>
          </View>

          {latestPedidos.length === 0 ? (
            <AppText color="textSecondary">
              No existen pedidos registrados.
            </AppText>
          ) : (
            latestPedidos.map((pedido) => (
              <LatestPedidoCard
                key={pedido.id}
                pedido={pedido}
              />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

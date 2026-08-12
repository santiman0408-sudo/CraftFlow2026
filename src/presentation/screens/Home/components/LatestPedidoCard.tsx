import React from "react";
import { StyleSheet, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { DashboardPedido } from "@/domain";

import AppCard from "@/presentation/components/common/AppCard";
import AppText from "@/presentation/components/common/AppText";

import { Colors, Radius, Spacing } from "@/presentation/theme";

interface Props {
  pedido: DashboardPedido;
}

export default function LatestPedidoCard({ pedido }: Props) {
  function getStatusColor() {
    switch (pedido.estado) {
      case "PENDIENTE":
        return Colors.warning;

      case "ENTREGADO":
        return Colors.success;

      case "CANCELADO":
        return Colors.error;

      case "EN_PROCESO":
        return Colors.primary;

      default:
        return Colors.textSecondary;
    }
  }

  function formatFecha(fecha: string) {
    try {
      return new Date(fecha).toLocaleDateString("es-PE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return fecha;
    }
  }

  return (
    <AppCard style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Ionicons name="receipt-outline" size={22} color={Colors.primary} />
        </View>

        <View style={styles.info}>
          <AppText bold variant="title">
            Pedido #{pedido.id}
          </AppText>

          <AppText color="textSecondary">{formatFecha(pedido.fecha)}</AppText>
        </View>
      </View>

      <View style={styles.section}>
        <AppText bold>Cliente</AppText>

        <AppText>{pedido.clienteNombre}</AppText>
      </View>

      <View style={styles.section}>
        <AppText bold>Producto</AppText>

        <AppText>{pedido.productoNombre}</AppText>
      </View>

      <View style={styles.footer}>
        <View>
          <AppText color="textSecondary">Total</AppText>

          <AppText bold>S/ {pedido.total.toFixed(2)}</AppText>
        </View>

        <View
          style={[
            styles.badge,
            {
              backgroundColor: getStatusColor(),
            },
          ]}
        >
          <AppText bold>{pedido.estado}</AppText>
        </View>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.md,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: Radius.full,
    backgroundColor: Colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
  },

  info: {
    flex: 1,
  },

  section: {
    marginBottom: Spacing.sm,
  },

  footer: {
    marginTop: Spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radius.lg,
  },
});

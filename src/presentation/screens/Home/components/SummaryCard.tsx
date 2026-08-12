import React from "react";

import { StyleSheet, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { BusinessSummary } from "@/domain";

import AppCard from "@/presentation/components/common/AppCard";
import AppText from "@/presentation/components/common/AppText";

import { Radius, Spacing } from "@/presentation/theme";

interface Props {
  summary: BusinessSummary;
}

export default function SummaryCard({ summary }: Props) {
  function Item(
    icon: keyof typeof Ionicons.glyphMap,
    title: string,
    value: string,
    color: string,
  ) {
    return (
      <View style={styles.item}>
        <View
          style={[
            styles.icon,
            {
              backgroundColor: color,
            },
          ]}
        >
          <Ionicons name={icon} size={18} color="#FFF" />
        </View>

        <View style={styles.info}>
          <AppText color="textSecondary">{title}</AppText>

          <AppText bold variant="title">
            {value}
          </AppText>
        </View>
      </View>
    );
  }

  return (
    <AppCard>
      <AppText variant="title" bold style={styles.title}>
        Resumen del negocio
      </AppText>

      {Item(
        "cash",
        "Ventas Totales",
        `S/ ${summary.ventasTotales.toFixed(2)}`,
        "#10B981",
      )}

      {Item(
        "cube",
        "Productos vendidos",
        String(summary.productosVendidos),
        "#3B82F6",
      )}

      {Item(
        "checkmark-circle",
        "Pedidos entregados",
        String(summary.pedidosEntregados),
        "#22C55E",
      )}

      {Item(
        "time",
        "Pedidos pendientes",
        String(summary.pedidosPendientes),
        "#F59E0B",
      )}
    </AppCard>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: Spacing.md,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
  },

  icon: {
    width: 42,
    height: 42,
    borderRadius: Radius.full,
    justifyContent: "center",
    alignItems: "center",
  },

  info: {
    marginLeft: Spacing.md,
    flex: 1,
  },
});

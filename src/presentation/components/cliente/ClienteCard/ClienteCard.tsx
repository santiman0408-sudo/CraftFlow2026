import React from "react";

import { TouchableOpacity, View, Pressable } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import AppCard from "@/presentation/components/common/AppCard";
import AppText from "@/presentation/components/common/AppText";

import { Colors } from "@/presentation/theme";

import { ClienteCardProps } from "./types";
import { styles } from "./styles";

export default function ClienteCard({
  cliente,

  onPress,

  onEdit,

  onDelete,
}: ClienteCardProps) {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
      <AppCard style={styles.container}>
        <View style={styles.content}>
          <View style={styles.info}>
            <AppText variant="subtitle" bold>
              {cliente.nombre}
            </AppText>

            <AppText>📞 {cliente.telefono}</AppText>

            <AppText color="textSecondary">📍 {cliente.direccion}</AppText>
          </View>

          <View style={styles.actions}>
            <Pressable onPress={onEdit} style={styles.actionButton}>
              <Ionicons
                name="create-outline"
                size={22}
                color={Colors.primary}
              />
            </Pressable>

            <Pressable onPress={onDelete} style={styles.actionButton}>
              <Ionicons name="trash-outline" size={22} color={Colors.error} />
            </Pressable>
          </View>
        </View>
      </AppCard>
    </TouchableOpacity>
  );
}

import React from "react";

import { TouchableOpacity, View, Pressable } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import AppCard from "@/presentation/components/common/AppCard";
import AppText from "@/presentation/components/common/AppText";

import { Colors } from "@/presentation/theme";

import { CategoriaCardProps } from "./types";
import { styles } from "./styles";

export default function CategoriaCard({
  categoria,

  onPress,

  onEdit,

  onDelete,
}: CategoriaCardProps) {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
      <AppCard style={styles.container}>
        <View style={styles.content}>
          <View style={styles.info}>
            <AppText variant="subtitle" bold>
              {categoria.nombre}
            </AppText>
          </View>

          <View style={styles.actions}>
            <Pressable style={styles.actionButton} onPress={onEdit}>
              <Ionicons
                name="create-outline"
                size={22}
                color={Colors.primary}
              />
            </Pressable>

            <Pressable style={styles.actionButton} onPress={onDelete}>
              <Ionicons name="trash-outline" size={22} color={Colors.error} />
            </Pressable>
          </View>
        </View>
      </AppCard>
    </TouchableOpacity>
  );
}

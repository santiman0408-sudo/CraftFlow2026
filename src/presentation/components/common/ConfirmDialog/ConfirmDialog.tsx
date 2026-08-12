import React from "react";

import { Modal, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import AppButton from "@/presentation/components/common/AppButton";
import AppText from "@/presentation/components/common/AppText";

import { Colors } from "@/presentation/theme";

import { styles } from "./styles";

interface ConfirmDialogProps {
  visible: boolean;

  title: string;

  message: string;

  confirmText?: string;

  cancelText?: string;

  loading?: boolean;

  onConfirm(): void;

  onCancel(): void;
}

export default function ConfirmDialog({
  visible,

  title,

  message,

  confirmText = "Eliminar",

  cancelText = "Cancelar",

  loading = false,

  onConfirm,

  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <Ionicons name="warning" size={42} color={Colors.warning} />
          </View>

          <AppText variant="title" bold style={styles.title}>
            {title}
          </AppText>

          <AppText color="textSecondary" style={styles.message}>
            {message}
          </AppText>

          <View style={styles.buttons}>
            <View style={styles.button}>
              <AppButton
                title={cancelText}
                variant="outline"
                onPress={onCancel}
                disabled={loading}
              />
            </View>

            <View style={styles.button}>
              <AppButton
                title={confirmText}
                onPress={onConfirm}
                loading={loading}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

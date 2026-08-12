import React from "react";

import { ActivityIndicator, Modal, View } from "react-native";

import AppText from "@/presentation/components/common/AppText";

import { Colors } from "@/presentation/theme";

import { LoadingOverlayProps } from "./types";

import { styles } from "./styles";

export default function LoadingOverlay({
  visible,

  message = "Procesando información...",
}: LoadingOverlayProps) {
  if (!visible) {
    return null;
  }

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color={Colors.primary} />

          <AppText style={styles.message} center>
            {message}
          </AppText>
        </View>
      </View>
    </Modal>
  );
}

import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppButton from "@/presentation/components/common/AppButton";
import AppCard from "@/presentation/components/common/AppCard";
import AppInput from "@/presentation/components/common/AppInput";
import AppSnackbar from "@/presentation/components/common/AppSnackbar";
import AppText from "@/presentation/components/common/AppText";

import { useAuth } from "@/presentation/context";
import { useSnackbar } from "@/presentation/hooks/useSnackbar";

import { styles } from "./styles";

export default function LoginScreen() {
  const { login, loading } = useAuth();

  const snackbar = useSnackbar();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    if (!username.trim()) {
      snackbar.error("Ingrese su usuario.");
      return;
    }

    if (!password) {
      snackbar.error("Ingrese su contraseña.");
      return;
    }

    const success = await login(username, password);

    if (!success) {
      snackbar.error("Usuario o contraseña incorrectos.");
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.logoContainer}>
            <AppText
              variant="h1"
              bold
              color="primary"
            >
              CraftFlow
            </AppText>

            <AppText
              color="textSecondary"
              style={styles.subtitle}
            >
              Gestión de pedidos artesanales
            </AppText>
          </View>

          <AppCard style={styles.card}>
            <AppText
              variant="h2"
              bold
              style={styles.title}
            >
              Iniciar sesión
            </AppText>

            <AppText
              color="textSecondary"
              style={styles.description}
            >
              Ingrese sus credenciales para acceder
              a CraftFlow.
            </AppText>

            <AppInput
              label="Usuario"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />

            <AppInput
              label="Contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />

            <AppButton
              title="Iniciar sesión"
              loading={loading}
              onPress={handleLogin}
            />

            <AppText
              color="textSecondary"
              style={styles.hint}
            >
              Usuario: admin
            </AppText>
          </AppCard>
        </ScrollView>
      </KeyboardAvoidingView>

      <AppSnackbar
        visible={snackbar.visible}
        message={snackbar.message}
        type={snackbar.type}
        onHide={snackbar.hide}
      />
    </SafeAreaView>
  );
}
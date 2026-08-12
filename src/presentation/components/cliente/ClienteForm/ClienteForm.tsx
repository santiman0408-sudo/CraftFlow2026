import { useState } from "react";
import { Alert, View } from "react-native";

import AppInput from "@/presentation/components/common/AppInput";
import AppButton from "@/presentation/components/common/AppButton";

import { ClienteFormProps } from "./types";
import { styles } from "./styles";

export default function ClienteForm({
  initialValues,
  loading,
  onSubmit,
  onCancel,
}: ClienteFormProps) {
  const [nombre, setNombre] = useState(initialValues?.nombre ?? "");

  const [telefono, setTelefono] = useState(initialValues?.telefono ?? "");

  const [direccion, setDireccion] = useState(initialValues?.direccion ?? "");

  async function handleSave() {
    if (!nombre.trim()) {
      Alert.alert("Validación", "Ingrese el nombre.");
      return;
    }

    if (!telefono.trim()) {
      Alert.alert("Validación", "Ingrese el teléfono.");
      return;
    }

    if (!direccion.trim()) {
      Alert.alert("Validación", "Ingrese la dirección.");
      return;
    }

    await onSubmit({
      nombre: nombre.trim(),
      telefono: telefono.trim(),
      direccion: direccion.trim(),
    });
  }

  return (
    <View style={styles.container}>
      <AppInput
        label="Nombre"
        value={nombre}
        placeholder="Nombre completo"
        onChangeText={setNombre}
      />

      <AppInput
        label="Teléfono"
        value={telefono}
        keyboardType="phone-pad"
        placeholder="999999999"
        onChangeText={setTelefono}
      />

      <AppInput
        label="Dirección"
        value={direccion}
        placeholder="Dirección"
        onChangeText={setDireccion}
      />

      <View style={styles.buttons}>
        <AppButton title="Guardar" loading={loading} onPress={handleSave} />

        {onCancel && (
          <AppButton title="Cancelar" variant="outline" onPress={onCancel} />
        )}
      </View>
    </View>
  );
}

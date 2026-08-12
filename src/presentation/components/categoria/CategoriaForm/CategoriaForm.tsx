import { useState } from "react";
import { Alert, View } from "react-native";

import AppInput from "@/presentation/components/common/AppInput";
import AppButton from "@/presentation/components/common/AppButton";

import { validateName } from "@/core/validators";

import { CategoriaFormProps } from "./types";
import { styles } from "./styles";

export default function CategoriaForm({
  initialValues,
  loading,
  onSubmit,
  onCancel,
}: CategoriaFormProps) {
  const [nombre, setNombre] = useState(initialValues?.nombre ?? "");

  async function handleSave() {
    const validation = validateName(nombre);

    if (!validation.valid) {
      Alert.alert("Validación", validation.message);

      return;
    }

    await onSubmit({
      nombre: nombre.trim(),
    });
  }

  return (
    <View style={styles.container}>
      <AppInput
        label="Nombre"
        placeholder="Nombre de la categoría"
        value={nombre}
        onChangeText={setNombre}
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

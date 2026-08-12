import { useMemo, useState } from "react";
import { Alert, View } from "react-native";

import AppInput from "@/presentation/components/common/AppInput";
import AppButton from "@/presentation/components/common/AppButton";
import AppSelect from "@/presentation/components/common/AppSelect";

import { useCategoria } from "@/presentation/context";

import { validateName } from "@/core/validators";

import { ProductoFormProps } from "./types";

import { styles } from "./styles";

export default function ProductoForm({
  initialValues,

  loading,

  onSubmit,

  onCancel,
}: ProductoFormProps) {
  const { categorias } = useCategoria();

  const [nombre, setNombre] = useState(initialValues?.nombre ?? "");

  const [precio, setPrecio] = useState(
    initialValues?.precio ? String(initialValues.precio) : "",
  );

  const [categoriaId, setCategoriaId] = useState<number>(
    initialValues?.categoriaId ?? 0,
  );

  const options = useMemo(
    () =>
      categorias.map((categoria) => ({
        label: categoria.nombre,
        value: categoria.id!,
      })),
    [categorias],
  );

  async function handleSave() {
    // Nombre
    const validation = validateName(nombre);

    if (!validation.valid) {
      Alert.alert("Validación", validation.message);

      return;
    }

    // Precio obligatorio

    if (!precio.trim()) {
      Alert.alert("Validación", "Ingrese el precio.");

      return;
    }

    // Precio numérico

    const precioNumber = Number(precio);

    if (Number.isNaN(precioNumber)) {
      Alert.alert("Validación", "Ingrese un precio válido.");

      return;
    }

    // Precio mayor que cero

    if (precioNumber <= 0) {
      Alert.alert("Validación", "El precio debe ser mayor que cero.");

      return;
    }

    // Categoría

    if (categoriaId === 0) {
      Alert.alert("Validación", "Seleccione una categoría.");

      return;
    }

    await onSubmit({
      nombre: nombre.trim(),

      precio: precioNumber,

      categoriaId,
    });
  }

  return (
    <View style={styles.container}>
      <AppInput
        label="Nombre"
        placeholder="Nombre del producto"
        value={nombre}
        onChangeText={setNombre}
      />

      <AppInput
        label="Precio"
        placeholder="0.00"
        value={precio}
        keyboardType="decimal-pad"
        onChangeText={setPrecio}
      />

      <AppSelect
        label="Categoría"
        value={categoriaId}
        options={options}
        onValueChange={(value) => setCategoriaId(Number(value))}
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

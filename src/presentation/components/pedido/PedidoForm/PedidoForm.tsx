import { useEffect, useMemo, useState } from "react";
import { Alert, View } from "react-native";

import AppButton from "@/presentation/components/common/AppButton";
import AppInput from "@/presentation/components/common/AppInput";
import AppSelect from "@/presentation/components/common/AppSelect";
import MoneyCard from "@/presentation/components/common/MoneyCard";

import { useCliente, useProducto } from "@/presentation/context";

import { PedidoFormProps } from "./types";
import { styles } from "./styles";

const ESTADOS = [
  {
    label: "Pendiente",
    value: "PENDIENTE",
  },
  {
    label: "En Proceso",
    value: "EN_PROCESO",
  },
  {
    label: "Entregado",
    value: "ENTREGADO",
  },
  {
    label: "Cancelado",
    value: "CANCELADO",
  },
];

export default function PedidoForm({
  initialValues,
  loading,
  onSubmit,
  onCancel,
}: PedidoFormProps) {
  const { clientes } = useCliente();
  const { productos } = useProducto();

  const [clienteId, setClienteId] = useState(
    initialValues?.clienteId ?? 0,
  );

  const [productoId, setProductoId] = useState(
    initialValues?.productoId ?? 0,
  );

  const [cantidad, setCantidad] = useState(
    initialValues?.cantidad
      ? String(initialValues.cantidad)
      : "1",
  );

  const [precioUnitario, setPrecioUnitario] = useState(
    initialValues?.precioUnitario ?? 0,
  );

  const [estado, setEstado] = useState(
    initialValues?.estado ?? "PENDIENTE",
  );

  const clienteOptions = useMemo(
    () =>
      clientes.map((cliente) => ({
        label: cliente.nombre,
        value: cliente.id!,
      })),
    [clientes],
  );

  const productoOptions = useMemo(
    () =>
      productos.map((producto) => ({
        label: producto.nombre,
        value: producto.id!,
      })),
    [productos],
  );

  useEffect(() => {
    console.log("======================================");
    console.log("Productos disponibles:", productos);
    console.log("Producto seleccionado:", productoId);

    if (productoId === 0) {
      console.log("No se seleccionó producto.");

      setPrecioUnitario(0);
      return;
    }

    const producto = productos.find(
      (p) => Number(p.id) === Number(productoId),
    );

    console.log("Producto encontrado:", producto);

    if (producto) {
      console.log("Precio:", producto.precio);

      setPrecioUnitario(Number(producto.precio));
    } else {
      console.log("No se encontró el producto.");

      setPrecioUnitario(0);
    }
  }, [productoId, productos]);

  const cantidadNumero = Number(cantidad);

  const total = useMemo(() => {
    if (
      isNaN(cantidadNumero) ||
      cantidadNumero <= 0
    ) {
      return 0;
    }

    return cantidadNumero * precioUnitario;
  }, [cantidadNumero, precioUnitario]);

  async function handleSave() {
    if (clienteId === 0) {
      Alert.alert(
        "Validación",
        "Seleccione un cliente.",
      );

      return;
    }

    if (productoId === 0) {
      Alert.alert(
        "Validación",
        "Seleccione un producto.",
      );

      return;
    }

    if (
      isNaN(cantidadNumero) ||
      cantidadNumero <= 0
    ) {
      Alert.alert(
        "Validación",
        "Ingrese una cantidad válida.",
      );

      return;
    }

    if (precioUnitario <= 0) {
      Alert.alert(
        "Validación",
        "El producto seleccionado no tiene un precio válido.",
      );

      return;
    }

    await onSubmit({
      clienteId,
      productoId,
      cantidad: cantidadNumero,
      precioUnitario,
      total,
      estado,
      fecha:
        initialValues?.fecha ??
        new Date().toISOString(),
    });
  }

  return (
    <View style={styles.container}>
      <AppSelect
        label="Cliente"
        value={clienteId}
        options={clienteOptions}
        onValueChange={(value) =>
          setClienteId(Number(value))
        }
      />

      <AppSelect
        label="Producto"
        value={productoId}
        options={productoOptions}
        onValueChange={(value) =>
          setProductoId(Number(value))
        }
      />

      <AppInput
        label="Cantidad"
        keyboardType="numeric"
        value={cantidad}
        onChangeText={setCantidad}
      />

      <AppInput
        label="Precio Unitario"
        value={`S/ ${precioUnitario.toFixed(2)}`}
        editable={false}
      />

      <MoneyCard
        title="Total del Pedido"
        amount={total}
      />

      <AppSelect
        label="Estado"
        value={estado}
        options={ESTADOS}
        onValueChange={(value) =>
          setEstado(value as typeof estado)
        }
      />

      <View style={styles.buttons}>
        <AppButton
          title="Guardar"
          loading={loading}
          onPress={handleSave}
        />

        {onCancel && (
          <AppButton
            title="Cancelar"
            variant="outline"
            onPress={onCancel}
          />
        )}
      </View>
    </View>
  );
}

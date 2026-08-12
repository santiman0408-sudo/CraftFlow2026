import { Pedido } from "@/domain";

export interface PedidoFormData {
  clienteId: number;
  productoId: number;
  cantidad: number;
  precioUnitario: number;
  total: number;
  estado: Pedido["estado"];
  fecha: string;
}

export interface PedidoFormProps {
  initialValues?: Partial<PedidoFormData>;
  loading?: boolean;
  onSubmit(data: PedidoFormData): Promise<void> | void;
  onCancel?(): void;
}

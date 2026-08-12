export interface Pedido {
  id?: number;

  clienteId: number;

  productoId: number;

  cantidad: number;

  precioUnitario: number;

  total: number;

  estado: PedidoEstado;

  fecha: string;
}

export type PedidoEstado =
  "PENDIENTE" | "EN_PROCESO" | "ENTREGADO" | "CANCELADO";

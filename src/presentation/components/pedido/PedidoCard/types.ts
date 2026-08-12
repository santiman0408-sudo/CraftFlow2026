import { Pedido } from "@/domain";

export interface PedidoCardProps {
  pedido: Pedido;

  cliente: string;

  producto: string;

  onPress?(): void;

  onEdit?(): void;

  onDelete?(): void;
}

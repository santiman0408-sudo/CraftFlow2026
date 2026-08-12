import { Producto } from "@/domain";

export interface ProductoCardProps {
  producto: Producto;

  categoria: string;

  onPress?(): void;

  onEdit?(): void;

  onDelete?(): void;
}

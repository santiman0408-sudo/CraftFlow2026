import { Categoria } from "@/domain";

export interface CategoriaCardProps {
  categoria: Categoria;

  onPress?(): void;

  onEdit?(): void;

  onDelete?(): void;
}

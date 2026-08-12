import { Cliente } from "@/domain";

export interface ClienteCardProps {
  cliente: Cliente;

  onPress?(): void;

  onEdit?(): void;

  onDelete?(): void;
}

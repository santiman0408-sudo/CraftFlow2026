import { Cliente } from "@/domain";

export interface ClienteFormData {
  nombre: string;
  telefono: string;
  direccion: string;
}

export interface ClienteFormProps {
  initialValues?: Partial<Cliente>;

  loading?: boolean;

  onSubmit(data: ClienteFormData): Promise<void> | void;

  onCancel?(): void;
}

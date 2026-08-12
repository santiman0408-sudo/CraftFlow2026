import { Categoria } from "@/domain";

export interface CategoriaFormData {
  nombre: string;
}

export interface CategoriaFormProps {
  initialValues?: Partial<Categoria>;

  loading?: boolean;

  onSubmit(data: CategoriaFormData): Promise<void> | void;

  onCancel?(): void;
}

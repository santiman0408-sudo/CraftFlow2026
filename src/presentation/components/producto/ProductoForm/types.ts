import { Producto } from "@/domain";

export interface ProductoFormData {
  nombre: string;
  precio: number;
  categoriaId: number;
}

export interface ProductoFormProps {
  initialValues?: Partial<Producto>;

  loading?: boolean;

  onSubmit(data: ProductoFormData): Promise<void> | void;

  onCancel?(): void;
}

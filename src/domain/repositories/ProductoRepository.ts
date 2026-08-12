import { Producto } from "../entities";

export interface ProductoRepository {
  create(producto: Producto): Promise<number>;

  update(producto: Producto): Promise<void>;

  delete(id: number): Promise<void>;

  findById(id: number): Promise<Producto | null>;

  findAll(): Promise<Producto[]>;
}

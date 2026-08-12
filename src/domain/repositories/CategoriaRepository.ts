import { Categoria } from "../entities";

export interface CategoriaRepository {
  create(categoria: Categoria): Promise<number>;

  update(categoria: Categoria): Promise<void>;

  delete(id: number): Promise<void>;

  findById(id: number): Promise<Categoria | null>;

  findAll(): Promise<Categoria[]>;
}

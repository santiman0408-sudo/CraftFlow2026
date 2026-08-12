import { Cliente } from "../entities";

export interface ClienteRepository {
  create(cliente: Cliente): Promise<number>;

  update(cliente: Cliente): Promise<void>;

  delete(id: number): Promise<void>;

  findById(id: number): Promise<Cliente | null>;

  findAll(): Promise<Cliente[]>;
}

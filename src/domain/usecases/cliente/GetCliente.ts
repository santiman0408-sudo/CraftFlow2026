import { Cliente, ClienteRepository } from "@/domain";

export class GetCliente {
  constructor(private readonly repository: ClienteRepository) {}

  async execute(id: number): Promise<Cliente | null> {
    return this.repository.findById(id);
  }
}

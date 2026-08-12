import { Cliente, ClienteRepository } from "@/domain";

export class CreateCliente {
  constructor(private readonly repository: ClienteRepository) {}

  async execute(cliente: Cliente): Promise<number> {
    return this.repository.create(cliente);
  }
}

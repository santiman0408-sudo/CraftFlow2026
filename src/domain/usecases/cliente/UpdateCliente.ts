import { Cliente, ClienteRepository } from "@/domain";

export class UpdateCliente {
  constructor(private readonly repository: ClienteRepository) {}

  async execute(cliente: Cliente): Promise<void> {
    return this.repository.update(cliente);
  }
}

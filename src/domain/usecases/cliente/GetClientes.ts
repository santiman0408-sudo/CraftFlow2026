import { Cliente, ClienteRepository } from "@/domain";

export class GetClientes {
  constructor(private readonly repository: ClienteRepository) {}

  async execute(): Promise<Cliente[]> {
    return this.repository.findAll();
  }
}

import { ClienteRepository } from "@/domain";

export class DeleteCliente {
  constructor(private readonly repository: ClienteRepository) {}

  async execute(id: number): Promise<void> {
    return this.repository.delete(id);
  }
}

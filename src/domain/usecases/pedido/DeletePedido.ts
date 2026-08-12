import { PedidoRepository } from "@/domain";

export class DeletePedido {
  constructor(private repository: PedidoRepository) {}

  execute(id: number) {
    return this.repository.delete(id);
  }
}

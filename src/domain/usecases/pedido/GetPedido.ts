import { PedidoRepository } from "@/domain";

export class GetPedido {
  constructor(private repository: PedidoRepository) {}

  execute(id: number) {
    return this.repository.findById(id);
  }
}

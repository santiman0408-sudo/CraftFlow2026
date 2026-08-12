import { Pedido, PedidoRepository } from "@/domain";

export class CreatePedido {
  constructor(private repository: PedidoRepository) {}

  execute(pedido: Pedido) {
    return this.repository.create(pedido);
  }
}

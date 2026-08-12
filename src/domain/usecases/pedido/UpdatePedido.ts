import { Pedido, PedidoRepository } from "@/domain";

export class UpdatePedido {
  constructor(private repository: PedidoRepository) {}

  execute(pedido: Pedido) {
    return this.repository.update(pedido);
  }
}

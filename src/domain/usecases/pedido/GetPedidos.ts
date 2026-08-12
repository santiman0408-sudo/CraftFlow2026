import { PedidoRepository } from "@/domain";

export class GetPedidos {
  constructor(private repository: PedidoRepository) {}

  execute() {
    return this.repository.findAll();
  }
}

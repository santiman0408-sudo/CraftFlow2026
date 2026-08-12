import { DashboardPedido, PedidoRepository } from "@/domain";

export class GetLatestPedidos {
  constructor(private repository: PedidoRepository) {}

  execute(limit: number = 5): Promise<DashboardPedido[]> {
    return this.repository.getLatestPedidos(limit);
  }
}

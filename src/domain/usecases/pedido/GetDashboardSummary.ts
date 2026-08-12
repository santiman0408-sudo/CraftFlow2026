import { DashboardSummary, PedidoRepository } from "@/domain";

export class GetDashboardSummary {
  constructor(private repository: PedidoRepository) {}

  execute(): Promise<DashboardSummary> {
    return this.repository.getDashboardSummary();
  }
}

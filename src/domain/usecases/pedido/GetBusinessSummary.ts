import { BusinessSummary, PedidoRepository } from "@/domain";

export class GetBusinessSummary {
  constructor(private repository: PedidoRepository) {}

  execute(): Promise<BusinessSummary> {
    return this.repository.getBusinessSummary();
  }
}

import {
  Pedido,
  DashboardSummary,
  DashboardPedido,
  BusinessSummary,
} from "../entities";

export interface PedidoRepository {
  create(pedido: Pedido): Promise<number>;

  update(pedido: Pedido): Promise<void>;

  delete(id: number): Promise<void>;

  findById(id: number): Promise<Pedido | null>;

  findAll(): Promise<Pedido[]>;

  /**
   * Obtiene el resumen mostrado
   * en el Dashboard.
   */
  getDashboardSummary(): Promise<DashboardSummary>;

  /**
   * Obtiene los últimos pedidos
   * registrados.
   */
  getLatestPedidos(limit?: number): Promise<DashboardPedido[]>;

  /**
   * Obtiene los indicadores
   * principales del negocio.
   */
  getBusinessSummary(): Promise<BusinessSummary>;
}

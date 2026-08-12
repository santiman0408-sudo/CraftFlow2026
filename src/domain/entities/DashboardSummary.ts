import { DashboardPedido } from "./DashboardPedido";

export interface DashboardSummary {
  totalPedidos: number;

  pedidosPendientes: number;

  ultimosPedidos: DashboardPedido[];
}

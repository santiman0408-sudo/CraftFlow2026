import {
  Pedido,
  DashboardSummary,
  DashboardPedido,
  BusinessSummary,
} from "@/domain";

import { PedidoSQLiteRepository } from "@/infrastructure/database";

import {
  CreatePedido,
  UpdatePedido,
  DeletePedido,
  GetPedido,
  GetPedidos,
  GetDashboardSummary,
  GetLatestPedidos,
  GetBusinessSummary,
} from "@/domain";

const repository = new PedidoSQLiteRepository();

const createUseCase = new CreatePedido(repository);

const updateUseCase = new UpdatePedido(repository);

const deleteUseCase = new DeletePedido(repository);

const getUseCase = new GetPedido(repository);

const getAllUseCase = new GetPedidos(repository);

const dashboardUseCase = new GetDashboardSummary(repository);

const latestPedidosUseCase = new GetLatestPedidos(repository);

const businessSummaryUseCase = new GetBusinessSummary(repository);

export async function createPedido(pedido: Pedido): Promise<number> {
  return createUseCase.execute(pedido);
}

export async function updatePedido(pedido: Pedido): Promise<void> {
  return updateUseCase.execute(pedido);
}

export async function deletePedido(id: number): Promise<void> {
  return deleteUseCase.execute(id);
}

export async function getPedido(id: number): Promise<Pedido | null> {
  return getUseCase.execute(id);
}

export async function getPedidos(): Promise<Pedido[]> {
  return getAllUseCase.execute();
}

export async function getDashboardSummary(): Promise<DashboardSummary> {
  return dashboardUseCase.execute();
}

export async function getLatestPedidos(
  limit: number = 5,
): Promise<DashboardPedido[]> {
  return latestPedidosUseCase.execute(limit);
}

export async function getBusinessSummary(): Promise<BusinessSummary> {
  return businessSummaryUseCase.execute();
}

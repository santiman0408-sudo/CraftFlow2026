import { database, TABLES } from "../../database";

import {
  BusinessSummary,
  DashboardPedido,
  DashboardSummary,
  Pedido,
  PedidoRepository,
} from "../../domain";

export class PedidoSQLiteRepository implements PedidoRepository {
  async create(pedido: Pedido): Promise<number> {
    const result = database.runSync(
      `INSERT INTO ${TABLES.PEDIDOS}
      (
        clienteId,
        productoId,
        cantidad,
        precioUnitario,
        total,
        estado,
        fecha
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        pedido.clienteId,
        pedido.productoId,
        pedido.cantidad,
        pedido.precioUnitario,
        pedido.total,
        pedido.estado,
        pedido.fecha,
      ],
    );

    return Number(result.lastInsertRowId);
  }

  async update(pedido: Pedido): Promise<void> {
    if (pedido.id === undefined) {
      throw new Error("El pedido debe tener un ID.");
    }

    database.runSync(
      `UPDATE ${TABLES.PEDIDOS}

       SET

       clienteId = ?,

       productoId = ?,

       cantidad = ?,

       precioUnitario = ?,

       total = ?,

       estado = ?,

       fecha = ?

       WHERE id = ?`,
      [
        pedido.clienteId,

        pedido.productoId,

        pedido.cantidad,

        pedido.precioUnitario,

        pedido.total,

        pedido.estado,

        pedido.fecha,

        pedido.id,
      ],
    );
  }

  async delete(id: number): Promise<void> {
    database.runSync(
      `DELETE
       FROM ${TABLES.PEDIDOS}
       WHERE id = ?`,
      [id],
    );
  }

  async findById(id: number): Promise<Pedido | null> {
    const result = database.getFirstSync<Pedido>(
      `SELECT *
         FROM ${TABLES.PEDIDOS}
         WHERE id = ?`,
      [id],
    );

    return result ?? null;
  }

  async findAll(): Promise<Pedido[]> {
    return database.getAllSync<Pedido>(
      `SELECT *
       FROM ${TABLES.PEDIDOS}
       ORDER BY fecha DESC`,
    );
  }

  async getDashboardSummary(): Promise<DashboardSummary> {
    const resumen = database.getFirstSync<{
      totalPedidos: number;
      pedidosPendientes: number;
    }>(
      `SELECT

            COUNT(*) AS totalPedidos,

            COALESCE(
              SUM(
                CASE
                  WHEN estado = 'PENDIENTE'
                  THEN 1
                  ELSE 0
                END
              ),
              0
            ) AS pedidosPendientes

         FROM ${TABLES.PEDIDOS}`,
    );

    return {
      totalPedidos: resumen?.totalPedidos ?? 0,

      pedidosPendientes: resumen?.pedidosPendientes ?? 0,

      ultimosPedidos: await this.getLatestPedidos(),
    };
  }

  async getLatestPedidos(limit: number = 5): Promise<DashboardPedido[]> {
    return database.getAllSync<DashboardPedido>(
      `SELECT

          p.id,

          c.nombre AS clienteNombre,

          pr.nombre AS productoNombre,

          p.cantidad,

          p.total,

          p.estado,

          p.fecha

       FROM ${TABLES.PEDIDOS} p

       INNER JOIN ${TABLES.CLIENTES} c
            ON c.id = p.clienteId

       INNER JOIN ${TABLES.PRODUCTOS} pr
            ON pr.id = p.productoId

       ORDER BY

            datetime(p.fecha) DESC,

            p.id DESC

       LIMIT ?`,
      [limit],
    );
  }

  async getBusinessSummary(): Promise<BusinessSummary> {
    const result = database.getFirstSync<BusinessSummary>(
      `SELECT

            COALESCE(
              SUM(total),
              0
            ) AS ventasTotales,

            COALESCE(
              SUM(cantidad),
              0
            ) AS productosVendidos,

            COALESCE(
              SUM(
                CASE
                  WHEN estado = 'ENTREGADO'
                  THEN 1
                  ELSE 0
                END
              ),
              0
            ) AS pedidosEntregados,

            COALESCE(
              SUM(
                CASE
                  WHEN estado = 'PENDIENTE'
                  THEN 1
                  ELSE 0
                END
              ),
              0
            ) AS pedidosPendientes

         FROM ${TABLES.PEDIDOS}`,
    );

    return {
      ventasTotales: result?.ventasTotales ?? 0,

      productosVendidos: result?.productosVendidos ?? 0,

      pedidosEntregados: result?.pedidosEntregados ?? 0,

      pedidosPendientes: result?.pedidosPendientes ?? 0,
    };
  }
}

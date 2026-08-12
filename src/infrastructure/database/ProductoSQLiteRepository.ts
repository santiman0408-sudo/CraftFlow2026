import { database, TABLES } from "../../database";

import { Producto, ProductoRepository } from "../../domain";

export class ProductoSQLiteRepository implements ProductoRepository {
  async create(producto: Producto): Promise<number> {
    const result = database.runSync(
      `INSERT INTO ${TABLES.PRODUCTOS}
      (nombre, precio, categoriaId)
      VALUES (?, ?, ?)`,
      [producto.nombre, producto.precio, producto.categoriaId],
    );

    return Number(result.lastInsertRowId);
  }

  async update(producto: Producto): Promise<void> {
    if (producto.id === undefined) {
      throw new Error("El producto debe tener un ID para actualizar.");
    }

    database.runSync(
      `UPDATE ${TABLES.PRODUCTOS}
       SET nombre = ?,
           precio = ?,
           categoriaId = ?
       WHERE id = ?`,
      [producto.nombre, producto.precio, producto.categoriaId, producto.id],
    );
  }

  async delete(id: number): Promise<void> {
    database.runSync(
      `DELETE FROM ${TABLES.PRODUCTOS}
       WHERE id = ?`,
      [id],
    );
  }

  async findById(id: number): Promise<Producto | null> {
    const result = database.getFirstSync<Producto>(
      `SELECT *
         FROM ${TABLES.PRODUCTOS}
         WHERE id = ?`,
      [id],
    );

    return result ?? null;
  }

  async findAll(): Promise<Producto[]> {
    return database.getAllSync<Producto>(
      `SELECT *
       FROM ${TABLES.PRODUCTOS}
       ORDER BY nombre`,
    );
  }
}

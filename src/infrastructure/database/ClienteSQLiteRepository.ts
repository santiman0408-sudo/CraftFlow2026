import { database, TABLES } from "../../database";

import { Cliente, ClienteRepository } from "../../domain";

export class ClienteSQLiteRepository implements ClienteRepository {
  async create(cliente: Cliente): Promise<number> {
    const result = database.runSync(
      `INSERT INTO ${TABLES.CLIENTES}
      (nombre, telefono, direccion)
      VALUES (?, ?, ?)`,
      [cliente.nombre, cliente.telefono, cliente.direccion],
    );

    return Number(result.lastInsertRowId);
  }

  async update(cliente: Cliente): Promise<void> {
    if (cliente.id === undefined) {
      throw new Error("El cliente debe tener un ID para actualizar.");
    }

    database.runSync(
      `UPDATE ${TABLES.CLIENTES}
       SET nombre = ?,
           telefono = ?,
           direccion = ?
       WHERE id = ?`,
      [cliente.nombre, cliente.telefono, cliente.direccion, cliente.id],
    );
  }

  async delete(id: number): Promise<void> {
    database.runSync(
      `DELETE FROM ${TABLES.CLIENTES}
       WHERE id = ?`,
      [id],
    );
  }

  async findById(id: number): Promise<Cliente | null> {
    const result = database.getFirstSync<Cliente>(
      `SELECT *
       FROM ${TABLES.CLIENTES}
       WHERE id = ?`,
      [id],
    );

    return result ?? null;
  }

  async findAll(): Promise<Cliente[]> {
    return database.getAllSync<Cliente>(
      `SELECT *
       FROM ${TABLES.CLIENTES}`,
    );
  }
}

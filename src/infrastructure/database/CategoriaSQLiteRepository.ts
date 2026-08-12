import { database, TABLES } from "../../database";

import { Categoria, CategoriaRepository } from "../../domain";

export class CategoriaSQLiteRepository implements CategoriaRepository {
  async create(categoria: Categoria): Promise<number> {
    const result = database.runSync(
      `INSERT INTO ${TABLES.CATEGORIAS}
      (nombre)
      VALUES (?)`,
      [categoria.nombre],
    );

    return Number(result.lastInsertRowId);
  }

  async update(categoria: Categoria): Promise<void> {
    if (categoria.id === undefined) {
      throw new Error("La categoría debe tener un ID para actualizar.");
    }

    database.runSync(
      `UPDATE ${TABLES.CATEGORIAS}
       SET nombre = ?
       WHERE id = ?`,
      [categoria.nombre, categoria.id],
    );
  }

  async delete(id: number): Promise<void> {
    database.runSync(
      `DELETE FROM ${TABLES.CATEGORIAS}
       WHERE id = ?`,
      [id],
    );
  }

  async findById(id: number): Promise<Categoria | null> {
    const result = database.getFirstSync<Categoria>(
      `SELECT *
       FROM ${TABLES.CATEGORIAS}
       WHERE id = ?`,
      [id],
    );

    return result ?? null;
  }

  async findAll(): Promise<Categoria[]> {
    return database.getAllSync<Categoria>(
      `SELECT *
       FROM ${TABLES.CATEGORIAS}
       ORDER BY nombre`,
    );
  }
}

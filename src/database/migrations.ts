import { database } from "./database";
import { TABLES } from "./tables";

/**
 * Obtiene las columnas existentes de una tabla SQLite.
 */
function getTableColumns(tableName: string): string[] {
  const columns = database.getAllSync<{
    name: string;
  }>(`PRAGMA table_info(${tableName});`);

  return columns.map((column) => column.name);
}

/**
 * Comprueba si una columna existe.
 */
function columnExists(
  tableName: string,
  columnName: string,
): boolean {
  return getTableColumns(tableName).includes(columnName);
}

/**
 * Agrega una columna solamente cuando no existe.
 */
function addColumnIfMissing(
  tableName: string,
  columnDefinition: string,
): void {
  const columnName = columnDefinition
    .trim()
    .split(/\s+/)[0];

  if (columnExists(tableName, columnName)) {
    return;
  }

  database.execSync(
    `ALTER TABLE ${tableName} ADD COLUMN ${columnDefinition};`,
  );

  console.log(
    `✅ Columna agregada: ${tableName}.${columnName}`,
  );
}

/**
 * Inicializa y actualiza la base de datos SQLite.
 *
 * IMPORTANTE:
 *
 * CREATE TABLE IF NOT EXISTS solamente crea la tabla
 * cuando esta no existe.
 *
 * Si la tabla ya existe, SQLite NO modifica su estructura.
 *
 * Por ello se ejecutan migraciones incrementales después
 * de la creación inicial.
 */
export function initializeDatabase(): void {
  try {
    /**
     * =========================================================
     * 1. CREACIÓN DE TABLAS
     * =========================================================
     */

    database.execSync(`
      CREATE TABLE IF NOT EXISTS ${TABLES.CLIENTES} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        telefono TEXT,
        direccion TEXT
      );

      CREATE TABLE IF NOT EXISTS ${TABLES.CATEGORIAS} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS ${TABLES.PRODUCTOS} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        precio REAL NOT NULL,
        categoriaId INTEGER NOT NULL,
        FOREIGN KEY (categoriaId)
          REFERENCES ${TABLES.CATEGORIAS}(id)
      );

      CREATE TABLE IF NOT EXISTS ${TABLES.PEDIDOS} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        clienteId INTEGER NOT NULL,
        productoId INTEGER NOT NULL,
        cantidad INTEGER NOT NULL,
        precioUnitario REAL NOT NULL,
        total REAL NOT NULL,
        estado TEXT NOT NULL,
        fecha TEXT NOT NULL,
        FOREIGN KEY (clienteId)
          REFERENCES ${TABLES.CLIENTES}(id),
        FOREIGN KEY (productoId)
          REFERENCES ${TABLES.PRODUCTOS}(id)
      );
    `);

    /**
     * =========================================================
     * 2. MIGRACIÓN DE PEDIDOS
     * =========================================================
     *
     * Se comprueba cada columna individualmente.
     *
     * Esto permite actualizar una base SQLite creada con una
     * versión anterior de CraftFlow sin eliminar sus datos.
     */

    addColumnIfMissing(
      TABLES.PEDIDOS,
      "clienteId INTEGER NOT NULL DEFAULT 0",
    );

    addColumnIfMissing(
      TABLES.PEDIDOS,
      "productoId INTEGER NOT NULL DEFAULT 0",
    );

    addColumnIfMissing(
      TABLES.PEDIDOS,
      "cantidad INTEGER NOT NULL DEFAULT 1",
    );

    addColumnIfMissing(
      TABLES.PEDIDOS,
      "precioUnitario REAL NOT NULL DEFAULT 0",
    );

    addColumnIfMissing(
      TABLES.PEDIDOS,
      "total REAL NOT NULL DEFAULT 0",
    );

    addColumnIfMissing(
      TABLES.PEDIDOS,
      "estado TEXT NOT NULL DEFAULT 'PENDIENTE'",
    );

    addColumnIfMissing(
      TABLES.PEDIDOS,
      "fecha TEXT NOT NULL DEFAULT ''",
    );

    /**
     * =========================================================
     * 3. MOSTRAR ESTRUCTURA FINAL DE PEDIDOS
     * =========================================================
     *
     * Esto nos permite verificar en la consola qué columnas
     * tiene finalmente la tabla.
     */

    const columnasPedidos = getTableColumns(
      TABLES.PEDIDOS,
    );

    console.log(
      "📋 Columnas actuales de pedidos:",
      columnasPedidos,
    );

    console.log("✅ Base de datos inicializada.");
  } catch (error) {
    console.error(
      "❌ Error inicializando la base de datos:",
      error,
    );

    throw error;
  }
}

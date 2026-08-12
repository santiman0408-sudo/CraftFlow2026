import { apiClient } from "./api.client";
import { database, TABLES } from "@/database";
import { Cliente, Categoria, Producto, Pedido } from "@/domain";

export interface SyncResponse {
  ok: boolean;
  message: string;
  summary: { clientes: number; categorias: number; productos: number; pedidos: number };
}

/** SQLite permanece como persistencia principal; la API recibe una copia. */
export async function syncLocalDataToApi(): Promise<SyncResponse | null> {
  try {
    const snapshot = {
      clientes: database.getAllSync<Cliente>(`SELECT * FROM ${TABLES.CLIENTES}`),
      categorias: database.getAllSync<Categoria>(`SELECT * FROM ${TABLES.CATEGORIAS}`),
      productos: database.getAllSync<Producto>(`SELECT * FROM ${TABLES.PRODUCTOS}`),
      pedidos: database.getAllSync<Pedido>(`SELECT * FROM ${TABLES.PEDIDOS}`),
    };
    const response = await apiClient.post<SyncResponse>("/sync", snapshot);
    console.log("🔄 API REST sincronizada:", response.summary);
    return response;
  } catch (error) {
    console.warn("⚠️ API REST no disponible; SQLite continúa operativa.", error);
    return null;
  }
}

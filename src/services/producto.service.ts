import { Producto } from "@/domain";
import { ProductoSQLiteRepository } from "@/infrastructure/database";

import {
  CreateProducto,
  UpdateProducto,
  DeleteProducto,
  GetProducto,
  GetProductos,
} from "@/domain";

const repository = new ProductoSQLiteRepository();

const createUseCase = new CreateProducto(repository);

const updateUseCase = new UpdateProducto(repository);

const deleteUseCase = new DeleteProducto(repository);

const getUseCase = new GetProducto(repository);

const getAllUseCase = new GetProductos(repository);

export async function createProducto(producto: Producto) {
  return createUseCase.execute(producto);
}

export async function updateProducto(producto: Producto) {
  return updateUseCase.execute(producto);
}

export async function deleteProducto(id: number) {
  return deleteUseCase.execute(id);
}

export async function getProducto(id: number) {
  return getUseCase.execute(id);
}

export async function getProductos() {
  return getAllUseCase.execute();
}

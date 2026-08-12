import { Categoria } from "@/domain";
import { CategoriaSQLiteRepository } from "@/infrastructure/database";

import {
  CreateCategoria,
  UpdateCategoria,
  DeleteCategoria,
  GetCategoria,
  GetCategorias,
} from "@/domain";

const repository = new CategoriaSQLiteRepository();

const createUseCase = new CreateCategoria(repository);
const updateUseCase = new UpdateCategoria(repository);
const deleteUseCase = new DeleteCategoria(repository);
const getUseCase = new GetCategoria(repository);
const getAllUseCase = new GetCategorias(repository);

export async function createCategoria(categoria: Categoria) {
  return createUseCase.execute(categoria);
}

export async function updateCategoria(categoria: Categoria) {
  return updateUseCase.execute(categoria);
}

export async function deleteCategoria(id: number) {
  return deleteUseCase.execute(id);
}

export async function getCategoria(id: number) {
  return getUseCase.execute(id);
}

export async function getCategorias() {
  return getAllUseCase.execute();
}

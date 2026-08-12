import { Cliente } from "@/domain";
import { ClienteSQLiteRepository } from "@/infrastructure/database";

import {
  CreateCliente,
  UpdateCliente,
  DeleteCliente,
  GetCliente,
  GetClientes,
} from "@/domain";

const repository = new ClienteSQLiteRepository();

const createUseCase = new CreateCliente(repository);
const updateUseCase = new UpdateCliente(repository);
const deleteUseCase = new DeleteCliente(repository);
const getUseCase = new GetCliente(repository);
const getAllUseCase = new GetClientes(repository);

export async function createCliente(cliente: Cliente) {
  return createUseCase.execute(cliente);
}

export async function updateCliente(cliente: Cliente) {
  return updateUseCase.execute(cliente);
}

export async function deleteCliente(id: number) {
  return deleteUseCase.execute(id);
}

export async function getCliente(id: number) {
  return getUseCase.execute(id);
}

export async function getClientes() {
  return getAllUseCase.execute();
}

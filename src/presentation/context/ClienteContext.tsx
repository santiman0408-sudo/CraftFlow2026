import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { Cliente } from "@/domain";
import { syncLocalDataToApi } from "@/services/api/api.sync";
import * as clienteService from "@/services/cliente.service";

interface ClienteContextData {
  clientes: Cliente[];

  loading: boolean;

  refreshClientes(): Promise<void>;

  createCliente(cliente: Cliente): Promise<void>;

  updateCliente(cliente: Cliente): Promise<void>;

  deleteCliente(id: number): Promise<void>;

  getCliente(id: number): Cliente | undefined;
}

const ClienteContext = createContext<ClienteContextData>(
  {} as ClienteContextData,
);

interface Props {
  children: ReactNode;
}

export function ClienteProvider({ children }: Props) {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  const [loading, setLoading] = useState(true);

  async function refreshClientes() {
    try {
      setLoading(true);

      const data = await clienteService.getClientes();

      setClientes(data);
    } catch (error) {
      console.error("Error al cargar clientes:", error);
    } finally {
      setLoading(false);
    }
  }

  async function createCliente(cliente: Cliente) {
    await clienteService.createCliente(cliente);
    await syncLocalDataToApi();

    await refreshClientes();
  }

  async function updateCliente(cliente: Cliente) {
    await clienteService.updateCliente(cliente);
    await syncLocalDataToApi();

    await refreshClientes();
  }

  async function deleteCliente(id: number) {
    await clienteService.deleteCliente(id);
    await syncLocalDataToApi();

    await refreshClientes();
  }

  function getCliente(id: number) {
    return clientes.find((cliente) => cliente.id === id);
  }

  useEffect(() => {
    refreshClientes();
  }, []);

  return (
    <ClienteContext.Provider
      value={{
        clientes,
        loading,
        refreshClientes,
        createCliente,
        updateCliente,
        deleteCliente,
        getCliente,
      }}
    >
      {children}
    </ClienteContext.Provider>
  );
}

export function useCliente() {
  return useContext(ClienteContext);
}

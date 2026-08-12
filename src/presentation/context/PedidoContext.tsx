import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { Pedido } from "@/domain";
import { syncLocalDataToApi } from "@/services/api/api.sync";

import * as pedidoService from "@/services/pedido.service";

import { useDashboard } from "./DashboardContext";

interface PedidoContextData {
  pedidos: Pedido[];

  loading: boolean;

  refreshPedidos(): Promise<void>;

  createPedido(pedido: Pedido): Promise<void>;

  updatePedido(pedido: Pedido): Promise<void>;

  deletePedido(id: number): Promise<void>;

  getPedido(id: number): Pedido | undefined;
}

const PedidoContext = createContext<PedidoContextData>({} as PedidoContextData);

interface Props {
  children: ReactNode;
}

export function PedidoProvider({ children }: Props) {
  const { refreshDashboard } = useDashboard();

  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const [loading, setLoading] = useState(true);

  async function refreshPedidos() {
    try {
      setLoading(true);

      const data = await pedidoService.getPedidos();

      setPedidos(data);
    } catch (error) {
      console.error("Error al cargar pedidos:", error);
    } finally {
      setLoading(false);
    }
  }

  async function createPedido(pedido: Pedido) {
    await pedidoService.createPedido(pedido);
    await syncLocalDataToApi();

    await Promise.all([refreshPedidos(), refreshDashboard()]);
  }

  async function updatePedido(pedido: Pedido) {
    await pedidoService.updatePedido(pedido);
    await syncLocalDataToApi();

    await Promise.all([refreshPedidos(), refreshDashboard()]);
  }

  async function deletePedido(id: number) {
    await pedidoService.deletePedido(id);
    await syncLocalDataToApi();

    await Promise.all([refreshPedidos(), refreshDashboard()]);
  }

  function getPedido(id: number) {
    return pedidos.find((pedido) => pedido.id === id);
  }

  useEffect(() => {
    refreshPedidos();
  }, []);

  return (
    <PedidoContext.Provider
      value={{
        pedidos,

        loading,

        refreshPedidos,

        createPedido,

        updatePedido,

        deletePedido,

        getPedido,
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
}

export function usePedido() {
  return useContext(PedidoContext);
}

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { BusinessSummary, DashboardPedido, DashboardSummary } from "@/domain";

import {
  getBusinessSummary,
  getDashboardSummary,
  getLatestPedidos,
} from "@/services";

interface DashboardContextData {
  loading: boolean;

  dashboard: DashboardSummary;

  business: BusinessSummary;

  latestPedidos: DashboardPedido[];

  refreshDashboard(): Promise<void>;
}

const DashboardContext = createContext<DashboardContextData>(
  {} as DashboardContextData,
);

interface Props {
  children: ReactNode;
}

export function DashboardProvider({ children }: Props) {
  const [loading, setLoading] = useState(false);

  const [dashboard, setDashboard] = useState<DashboardSummary>({
    totalPedidos: 0,
    pedidosPendientes: 0,
    ultimosPedidos: [],
  });

  const [business, setBusiness] = useState<BusinessSummary>({
    ventasTotales: 0,
    productosVendidos: 0,
    pedidosEntregados: 0,
    pedidosPendientes: 0,
  });

  const [latestPedidos, setLatestPedidos] = useState<DashboardPedido[]>([]);

  async function refreshDashboard() {
    try {
      setLoading(true);

      const [dashboardData, businessData, latestData] = await Promise.all([
        getDashboardSummary(),

        getBusinessSummary(),

        getLatestPedidos(5),
      ]);

      setDashboard(dashboardData);

      setBusiness(businessData);

      setLatestPedidos(latestData);
    } catch (error) {
      console.error("Error cargando Dashboard:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshDashboard();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        loading,
        dashboard,
        business,
        latestPedidos,
        refreshDashboard,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  return useContext(DashboardContext);
}

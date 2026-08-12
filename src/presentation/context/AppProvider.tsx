import { ReactNode } from "react";

import {
  AuthProvider,
  DashboardProvider,
  PedidoProvider,
  ClienteProvider,
  CategoriaProvider,
  ProductoProvider,
} from "@/presentation/context";

interface AppProviderProps {
  children: ReactNode;
}

export default function AppProvider({
  children,
}: AppProviderProps) {
  return (
    <AuthProvider>
      <DashboardProvider>
        <PedidoProvider>
          <ClienteProvider>
            <CategoriaProvider>
              <ProductoProvider>
                {children}
              </ProductoProvider>
            </CategoriaProvider>
          </ClienteProvider>
        </PedidoProvider>
      </DashboardProvider>
    </AuthProvider>
  );
}

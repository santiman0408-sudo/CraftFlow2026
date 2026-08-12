import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "./types";

// HOME
import HomeScreen from "@/presentation/screens/Home";

// ================================
// PEDIDOS
// ================================

import NuevoPedidoScreen from "@/presentation/screens/Pedido/NuevoPedido";
import ListaPedidosScreen from "@/presentation/screens/Pedido/ListaPedidos";
import DetallePedidoScreen from "@/presentation/screens/Pedido/DetallePedido";
import EditarPedidoScreen from "@/presentation/screens/Pedido/EditarPedido";

// ================================
// CLIENTES
// ================================

import NuevoClienteScreen from "@/presentation/screens/Cliente/NuevoCliente";
import ListaClientesScreen from "@/presentation/screens/Cliente/ListaClientes";
import DetalleClienteScreen from "@/presentation/screens/Cliente/DetalleCliente";
import EditarClienteScreen from "@/presentation/screens/Cliente/EditarCliente";

// ================================
// PRODUCTOS
// ================================

import NuevoProductoScreen from "@/presentation/screens/Producto/NuevoProducto";
import ListaProductosScreen from "@/presentation/screens/Producto/ListaProductos";
import DetalleProductoScreen from "@/presentation/screens/Producto/DetalleProducto";
import EditarProductoScreen from "@/presentation/screens/Producto/EditarProducto";

// ================================
// CATEGORÍAS
// ================================

import NuevaCategoriaScreen from "@/presentation/screens/Categoria/NuevaCategoria";
import ListaCategoriasScreen from "@/presentation/screens/Categoria/ListaCategorias";
import DetalleCategoriaScreen from "@/presentation/screens/Categoria/DetalleCategoria";
import EditarCategoriaScreen from "@/presentation/screens/Categoria/EditarCategoria";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* HOME */}

      <Stack.Screen name="Home" component={HomeScreen} />

      {/* ==========================
          PEDIDOS
      ========================== */}

      <Stack.Screen name="NuevoPedido" component={NuevoPedidoScreen} />

      <Stack.Screen name="ListaPedidos" component={ListaPedidosScreen} />

      <Stack.Screen name="DetallePedido" component={DetallePedidoScreen} />

      <Stack.Screen name="EditarPedido" component={EditarPedidoScreen} />

      {/* ==========================
          CLIENTES
      ========================== */}

      <Stack.Screen name="NuevoCliente" component={NuevoClienteScreen} />

      <Stack.Screen name="ListaClientes" component={ListaClientesScreen} />

      <Stack.Screen name="DetalleCliente" component={DetalleClienteScreen} />

      <Stack.Screen name="EditarCliente" component={EditarClienteScreen} />

      {/* ==========================
          PRODUCTOS
      ========================== */}

      <Stack.Screen name="NuevoProducto" component={NuevoProductoScreen} />

      <Stack.Screen name="ListaProductos" component={ListaProductosScreen} />

      <Stack.Screen name="DetalleProducto" component={DetalleProductoScreen} />

      <Stack.Screen name="EditarProducto" component={EditarProductoScreen} />

      {/* ==========================
          CATEGORÍAS
      ========================== */}

      <Stack.Screen name="NuevaCategoria" component={NuevaCategoriaScreen} />

      <Stack.Screen name="ListaCategorias" component={ListaCategoriasScreen} />

      <Stack.Screen
        name="DetalleCategoria"
        component={DetalleCategoriaScreen}
      />

      <Stack.Screen name="EditarCategoria" component={EditarCategoriaScreen} />
    </Stack.Navigator>
  );
}

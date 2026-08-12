export type RootStackParamList = {
  // HOME
  Home: undefined;

  // ============================
  // PEDIDOS
  // ============================

  NuevoPedido: undefined;

  ListaPedidos: undefined;

  DetallePedido: {
    pedidoId: number;
  };

  EditarPedido: {
    pedidoId: number;
  };

  // ============================
  // CLIENTES
  // ============================

  NuevoCliente: undefined;

  ListaClientes: undefined;

  DetalleCliente: {
    clienteId: number;
  };

  EditarCliente: {
    clienteId: number;
  };

  // ============================
  // PRODUCTOS
  // ============================

  NuevoProducto: undefined;

  ListaProductos: undefined;

  DetalleProducto: {
    productoId: number;
  };

  EditarProducto: {
    productoId: number;
  };

  // ============================
  // CATEGORÍAS
  // ============================

  NuevaCategoria: undefined;

  ListaCategorias: undefined;

  DetalleCategoria: {
    categoriaId: number;
  };

  EditarCategoria: {
    categoriaId: number;
  };

  // ============================
  // CATÁLOGO
  // (Lo implementaremos después)
  // ============================

  Catalogo: undefined;
};

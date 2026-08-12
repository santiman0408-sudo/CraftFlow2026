import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { Producto } from "@/domain";
import { syncLocalDataToApi } from "@/services/api/api.sync";
import * as productoService from "@/services/producto.service";

import { isSameText } from "@/core/utils";

interface ProductoContextData {
  productos: Producto[];

  loading: boolean;

  refreshProductos(): Promise<void>;

  createProducto(producto: Producto): Promise<void>;

  updateProducto(producto: Producto): Promise<void>;

  deleteProducto(id: number): Promise<void>;

  getProducto(id: number): Producto | undefined;
}

const ProductoContext = createContext<ProductoContextData>(
  {} as ProductoContextData,
);

interface Props {
  children: ReactNode;
}

export function ProductoProvider({ children }: Props) {
  const [productos, setProductos] = useState<Producto[]>([]);

  const [loading, setLoading] = useState(true);

  async function refreshProductos() {
    try {
      setLoading(true);

      const data = await productoService.getProductos();

      setProductos(data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    } finally {
      setLoading(false);
    }
  }

  async function createProducto(producto: Producto) {
    const existe = productos.some((item) =>
      isSameText(item.nombre, producto.nombre),
    );

    if (existe) {
      throw new Error("El producto ya existe.");
    }

    if (producto.precio <= 0) {
      throw new Error("El precio debe ser mayor que cero.");
    }

    if (!producto.categoriaId) {
      throw new Error("Debe seleccionar una categoría.");
    }

    await productoService.createProducto({
      ...producto,

      nombre: producto.nombre.trim(),
    });
    await syncLocalDataToApi();

    await refreshProductos();
  }

  async function updateProducto(producto: Producto) {
    const existe = productos.some(
      (item) =>
        item.id !== producto.id && isSameText(item.nombre, producto.nombre),
    );

    if (existe) {
      throw new Error("Ya existe otro producto con ese nombre.");
    }

    if (producto.precio <= 0) {
      throw new Error("El precio debe ser mayor que cero.");
    }

    if (!producto.categoriaId) {
      throw new Error("Debe seleccionar una categoría.");
    }

    await productoService.updateProducto({
      ...producto,

      nombre: producto.nombre.trim(),
    });
    await syncLocalDataToApi();

    await refreshProductos();
  }

  async function deleteProducto(id: number) {
    await productoService.deleteProducto(id);
    await syncLocalDataToApi();

    await refreshProductos();
  }

  function getProducto(id: number) {
    return productos.find((producto) => producto.id === id);
  }

  useEffect(() => {
    refreshProductos();
  }, []);

  return (
    <ProductoContext.Provider
      value={{
        productos,
        loading,
        refreshProductos,
        createProducto,
        updateProducto,
        deleteProducto,
        getProducto,
      }}
    >
      {children}
    </ProductoContext.Provider>
  );
}

export function useProducto() {
  return useContext(ProductoContext);
}

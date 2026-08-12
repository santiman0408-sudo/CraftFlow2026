import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { Categoria } from "@/domain";
import { syncLocalDataToApi } from "@/services/api/api.sync";
import * as categoriaService from "@/services/categoria.service";

import { isSameText } from "@/core/utils";

interface CategoriaContextData {
  categorias: Categoria[];

  loading: boolean;

  refreshCategorias(): Promise<void>;

  createCategoria(categoria: Categoria): Promise<void>;

  updateCategoria(categoria: Categoria): Promise<void>;

  deleteCategoria(id: number): Promise<void>;

  getCategoria(id: number): Categoria | undefined;
}

const CategoriaContext = createContext<CategoriaContextData>(
  {} as CategoriaContextData,
);

interface Props {
  children: ReactNode;
}

export function CategoriaProvider({ children }: Props) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [loading, setLoading] = useState(true);

  async function refreshCategorias() {
    try {
      setLoading(true);

      const data = await categoriaService.getCategorias();

      setCategorias(data);
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    } finally {
      setLoading(false);
    }
  }

  async function createCategoria(categoria: Categoria) {
    const existe = categorias.some((item) =>
      isSameText(item.nombre, categoria.nombre),
    );

    if (existe) {
      throw new Error("La categoría ya existe.");
    }

    await categoriaService.createCategoria({
      ...categoria,

      nombre: categoria.nombre.trim(),
    });
    await syncLocalDataToApi();

    await refreshCategorias();
  }

  async function updateCategoria(categoria: Categoria) {
    const existe = categorias.some(
      (item) =>
        item.id !== categoria.id && isSameText(item.nombre, categoria.nombre),
    );

    if (existe) {
      throw new Error("Ya existe otra categoría con ese nombre.");
    }

    await categoriaService.updateCategoria({
      ...categoria,

      nombre: categoria.nombre.trim(),
    });
    await syncLocalDataToApi();

    await refreshCategorias();
  }

  async function deleteCategoria(id: number) {
    await categoriaService.deleteCategoria(id);
    await syncLocalDataToApi();

    await refreshCategorias();
  }

  function getCategoria(id: number) {
    return categorias.find((categoria) => categoria.id === id);
  }

  useEffect(() => {
    refreshCategorias();
  }, []);

  return (
    <CategoriaContext.Provider
      value={{
        categorias,
        loading,
        refreshCategorias,
        createCategoria,
        updateCategoria,
        deleteCategoria,
        getCategoria,
      }}
    >
      {children}
    </CategoriaContext.Provider>
  );
}

export function useCategoria() {
  return useContext(CategoriaContext);
}

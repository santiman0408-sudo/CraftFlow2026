import { Producto, ProductoRepository } from "@/domain";

export class UpdateProducto {
  constructor(private repository: ProductoRepository) {}

  execute(producto: Producto) {
    return this.repository.update(producto);
  }
}

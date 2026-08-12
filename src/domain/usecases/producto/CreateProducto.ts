import { Producto, ProductoRepository } from "@/domain";

export class CreateProducto {
  constructor(private repository: ProductoRepository) {}

  execute(producto: Producto) {
    return this.repository.create(producto);
  }
}

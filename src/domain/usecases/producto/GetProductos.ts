import { ProductoRepository } from "@/domain";

export class GetProductos {
  constructor(private repository: ProductoRepository) {}

  execute() {
    return this.repository.findAll();
  }
}

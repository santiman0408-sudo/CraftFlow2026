import { ProductoRepository } from "@/domain";

export class GetProducto {
  constructor(private repository: ProductoRepository) {}

  execute(id: number) {
    return this.repository.findById(id);
  }
}

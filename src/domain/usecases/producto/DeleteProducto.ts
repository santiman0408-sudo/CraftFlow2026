import { ProductoRepository } from "@/domain";

export class DeleteProducto {
  constructor(private repository: ProductoRepository) {}

  execute(id: number) {
    return this.repository.delete(id);
  }
}

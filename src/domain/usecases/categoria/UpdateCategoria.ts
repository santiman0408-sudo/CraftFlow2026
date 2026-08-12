import { Categoria } from "@/domain/entities";
import { CategoriaRepository } from "@/domain/repositories";

export class UpdateCategoria {
  constructor(private repository: CategoriaRepository) {}

  execute(categoria: Categoria) {
    return this.repository.update(categoria);
  }
}

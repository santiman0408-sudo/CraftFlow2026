import { Categoria } from "@/domain/entities";
import { CategoriaRepository } from "@/domain/repositories";

export class CreateCategoria {
  constructor(private repository: CategoriaRepository) {}

  execute(categoria: Categoria) {
    return this.repository.create(categoria);
  }
}

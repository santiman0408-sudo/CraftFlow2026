import { CategoriaRepository } from "@/domain/repositories";

export class GetCategorias {
  constructor(private repository: CategoriaRepository) {}

  execute() {
    return this.repository.findAll();
  }
}

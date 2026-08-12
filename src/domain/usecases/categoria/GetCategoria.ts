import { CategoriaRepository } from "@/domain/repositories";

export class GetCategoria {
  constructor(private repository: CategoriaRepository) {}

  execute(id: number) {
    return this.repository.findById(id);
  }
}

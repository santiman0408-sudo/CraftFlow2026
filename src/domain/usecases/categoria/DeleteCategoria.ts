import { CategoriaRepository } from "@/domain/repositories";

export class DeleteCategoria {
  constructor(private repository: CategoriaRepository) {}

  execute(id: number) {
    return this.repository.delete(id);
  }
}

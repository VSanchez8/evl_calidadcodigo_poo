import { Book } from "../models/book";

export class BookService {
  async getAllBooks(): Promise<Book[]> {
    return [
      new Book(1, "Libro 1"),
      new Book(1, "Libro 2"),
    ];
  }
}

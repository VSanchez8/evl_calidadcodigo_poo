import { Request, Response } from "express";
import { BookService } from "../services/bookService";
import { Book } from "../models/book";

export class BookController {
  private bookService: BookService;

  constructor() {
    this.bookService = new BookService();
  }

  // Obtiene todos los libros
  getAll = async (req: Request, res: Response) => {
    try {
      const books = await this.bookService.getAllBooks();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ error: "Error fetching books" });
    }
  };

  // Obtiene un libro por ID
  getById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const book = await this.bookService.getBookById(id);
      if (book) {
        res.status(200).json(book);
      } else {
        res.status(404).json({ error: "Book not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching book" });
    }
  };

  // Crea un nuevo libro
  create = async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      const newBook = new Book(0, name); // El ID se generará automáticamente en la base de datos
      const createdBook = await this.bookService.createBook(newBook);
      res.status(201).json(createdBook);
    } catch (error) {
      res.status(500).json({ error: "Error creating book" });
    }
  };

  // Actualiza un libro por ID
  update = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { name } = req.body;
      const updatedBook = new Book(id, name);
      const result = await this.bookService.updateBook(id, updatedBook);
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ error: "Book not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error updating book" });
    }
  };

  // Elimina un libro por ID
  delete = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const success = await this.bookService.deleteBook(id);
      if (success) {
        res.status(204).send(); // No content
      } else {
        res.status(404).json({ error: "Book not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting book" });
    }
  };
}
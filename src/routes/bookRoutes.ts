import { Router } from "express";
import { BookController } from "../controllers/bookController";

const router = Router();
const bookController = new BookController();

router.get("/books", bookController.getAll);

export default router;

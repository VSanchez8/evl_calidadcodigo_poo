import { Router } from "express";
import { EditorialController } from "../controllers/editorialController";

const router = Router();
const editorialController = new EditorialController();

router.post('/editorials', editorialController.Create);
router.get('/editorials', editorialController.getAll);
router.get('/editorials/:id', editorialController.getById);
router.put('/editorials/:id', editorialController.update);
router.delete('/editorials/:id', editorialController.delete);

export default router;
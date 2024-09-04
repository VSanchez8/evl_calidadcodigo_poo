import { Request, Response } from "express";
import { EditorialService } from "../services/editorialService";
import { Editorial } from "../models/editorial";

export class EditorialController {
    private editorialService: EditorialService
    constructor () {
        this.editorialService = new EditorialService;
    }

    getAll = async (req: Request, res: Response) => {
        try {
          const editorials = await this.editorialService.getAllEditorials();
          res.status(200).json(editorials);
        } catch (error) {
          res.status(500).json({ error: "Error fetching editorials" });
        }
      };

    Create = async (req: Request, res: Response) => {
        try {
          const editorial: Editorial = req.body;
          const newEditorial = await this.editorialService.createEditorial(editorial);
          res.status(200).json(newEditorial);
        } catch (error) {
          res.status(500).json({ error: "Error fetching editorial" });
        }
      };

    getById = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id, 10);
            const editorial = await this.editorialService.getEditorialById(id);
            if (editorial) {
                res.status(200).json(editorial);
            } else {
                res.status(404).json({ message: "Editorial not found" });
            }
        } catch (error) {
            res.status(500).json({ error: "Error fetching editorial" });
        }
    };

    update = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id, 10);
            const updatedData = req.body;
            const updatedEditorial = await this.editorialService.updateEditorial(id, updatedData);
            if (updatedEditorial) {
                res.status(200).json(updatedEditorial);
            } else {
                res.status(404).json({ message: "Editorial not found" });
            }
        } catch (error) {
            res.status(500).json({ error: "Error updating editorial" });
        }
    };

    public delete = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id, 10);
            const success = await this.editorialService.deleteEditorial(id);
            if (success) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: "Editorial not found" });
            }
        } catch (error) {
            res.status(500).json({ error: "Error deleting editorial" });
        }
    };


}
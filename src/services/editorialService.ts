import { PoolClient } from "pg";
import pool from "../database/database";
import { Editorial } from "../models/editorial";

export class EditorialService {
    private  editorials: Editorial[] = [
        new Editorial(1, "Editorial 1", "calle 1"),
        new Editorial(2, "Editorial 2", "calle 2")
    ];
    private async getClient(): Promise<PoolClient> {
        const client = await pool.connect();
        return client;
    }



    async getAllEditorials(): Promise<Editorial[]> {
        return this.editorials;
      }
    
    async createEditorial(editorial: Editorial): Promise<Editorial> {
        this.editorials.push(editorial);
        return editorial;
    } 

    async getEditorialById(id: number): Promise<Editorial | undefined> {
        return this.editorials.find(editorial => editorial.id === id);
    }

    async updateEditorial(id: number, updatedData: Partial<Editorial>): Promise<Editorial | undefined> {
        const index = this.editorials.findIndex(editorial => editorial.id === id);
        if (index === -1) return undefined; // No encontrado

        const existingEditorial = this.editorials[index];
        const updatedEditorial = { ...existingEditorial, ...updatedData };

        this.editorials[index] = updatedEditorial;
        return updatedEditorial;
    }

    public async deleteEditorial(id: number): Promise<boolean> {
        const initialLength = this.editorials.length;
        this.editorials = this.editorials.filter(editorial => editorial.id !== id);
        return this.editorials.length < initialLength; // Devuelve true si se eliminó
    }
}
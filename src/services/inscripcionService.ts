import { api } from "./api";
import type { Inscripcion } from "../types";

export const inscripcionService = {
    getAll: async () => {
        const response = await api.get<Inscripcion[]>('/Inscripcion');
        return response.data;
    },
    create: async (data: Omit<Inscripcion, 'id'>) => {
        await api.post('/Inscripcion', data);
    },
    update: async (id: string, data: Omit<Inscripcion, 'id'>) => {
        await api.put(`/Inscripcion/${id}`, data);
    },
    delete: async (id: string) => {
        await api.delete(`/Inscripcion/${id}`);
    }
};
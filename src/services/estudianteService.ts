import { api } from "./api";
import type { Estudiante } from "../types";

export const estudianteService = {
    getAll: async () => {
        const response = await api.get<Estudiante[]>('/Estudiante');
        return response.data;
    },
    create: async (data: Omit<Estudiante, 'id'>) => {
        await api.post('/Estudiante', data);
    },
    update: async (id: string, data: Omit<Estudiante, 'id'>) => {
        await api.put(`/Estudiante/${id}`, data);
    },
    delete: async (id: string) => {
        await api.delete(`/Estudiante/${id}`);
    }
};
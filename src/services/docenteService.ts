import { api } from "./api";
import type { Docente } from "../types";

export const docenteService = {
    getAll: async () => {
        const response = await api.get<Docente[]>('/Docente');
        return response.data;
    },
    create: async (data: Omit<Docente, 'id'>) => {
        await api.post('/Docente', data);
    },
    update: async (id: string, data: Omit<Docente, 'id'>) => {
        await api.put(`/Docente/${id}`, data);
    },
    delete: async (id: string) => {
        await api.delete(`/Docente/${id}`);
    }
};
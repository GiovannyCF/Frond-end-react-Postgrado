import { api } from "./api";
import type { Diplomado } from "../types";

export const diplomadoService = {
    getAll: async () => {
        const response = await api.get<Diplomado[]>('/Diplomado');
        return response.data;
    },
    create: async (data: Omit<Diplomado, 'id'>) => {
        await api.post('/Diplomado', data);
    },
    update: async (id: string, data: Omit<Diplomado, 'id'>) => {
        await api.put(`/Diplomado/${id}`, data);
    },
    delete: async (id: string) => {
        await api.delete(`/Diplomado/${id}`);
    }
};
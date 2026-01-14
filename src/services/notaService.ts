import { api } from "./api";
import type { Nota } from "../types";

export const notaService = {
    getAll: async () => {
        const response = await api.get<Nota[]>('/Nota');
        return response.data;
    },
    create: async (data: Omit<Nota, 'id'>) => {
        await api.post('/Nota', data);
    },
    update: async (id: string, data: Omit<Nota, 'id'>) => {
        await api.put(`/Nota/${id}`, data);
    },
    delete: async (id: string) => {
        await api.delete(`/Nota/${id}`);
    }
};
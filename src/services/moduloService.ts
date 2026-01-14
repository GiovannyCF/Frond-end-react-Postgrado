import { api } from "./api";
import type { Modulo } from "../types";

export const moduloService = {
    getAll: async () => {
        const response = await api.get<Modulo[]>('/Modulo');
        return response.data;
    },
    create: async (data: Omit<Modulo, 'id'>) => {
        await api.post('/Modulo', data);
    },
    update: async (id: string, data: Omit<Modulo, 'id'>) => {
        await api.put(`/Modulo/${id}`, data);
    },
    delete: async (id: string) => {
        await api.delete(`/Modulo/${id}`);
    }
};
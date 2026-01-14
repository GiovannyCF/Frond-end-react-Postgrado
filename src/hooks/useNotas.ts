import { useState, useEffect } from "react";
import type { Nota } from "../types";
import { notaService } from "../services/notaService";

export const useNotas = () => {
    const [notas, setNotas] = useState<Nota[]>([]);
    const [loading, setLoading] = useState(false);

    const loadNotas = async () => {
        setLoading(true);
        try {
            const data = await notaService.getAll();
            setNotas(data);
        } catch (error) {
            console.error("Error cargando notas", error);
        } finally {
            setLoading(false);
        }
    };

    const crear = async (data: Omit<Nota, 'id'>) => {
        await notaService.create(data);
        await loadNotas();
    };

    const actualizar = async (id: string, data: Omit<Nota, 'id'>) => {
        await notaService.update(id, data);
        await loadNotas();
    };

    const eliminar = async (id: string) => {
        if (!confirm("¿Eliminar esta nota?")) return;
        await notaService.delete(id);
        await loadNotas();
    };

    useEffect(() => { loadNotas(); }, []);

    return { notas, loading, crear, actualizar, eliminar };
};
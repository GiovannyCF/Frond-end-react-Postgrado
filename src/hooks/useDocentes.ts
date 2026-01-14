import { useState, useEffect } from "react";
import type { Docente } from "../types";
import { docenteService } from "../services/docenteService";

export const useDocentes = () => {
    const [docentes, setDocentes] = useState<Docente[]>([]);
    const [loading, setLoading] = useState(false);

    const loadDocentes = async () => {
        setLoading(true);
        try {
            const data = await docenteService.getAll();
            setDocentes(data);
        } catch (error) {
            console.error("Error al cargar docentes", error);
        } finally {
            setLoading(false);
        }
    };

    const crear = async (data: Omit<Docente, 'id'>) => {
        await docenteService.create(data);
        await loadDocentes();
    };

    const actualizar = async (id: string, data: Omit<Docente, 'id'>) => {
        await docenteService.update(id, data);
        await loadDocentes();
    };

    const eliminar = async (id: string) => {
        if (!confirm("¿Eliminar este docente?")) return;
        await docenteService.delete(id);
        await loadDocentes();
    };

    useEffect(() => {
        loadDocentes();
    }, []);

    return { docentes, loading, crear, actualizar, eliminar };
};
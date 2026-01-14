import { useState, useEffect } from "react";
import type { Estudiante } from "../types";
import { estudianteService } from "../services/estudianteService";

export const useEstudiantes = () => {
    const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
    const [loading, setLoading] = useState(false);

    const loadEstudiantes = async () => {
        setLoading(true);
        try {
            const data = await estudianteService.getAll();
            setEstudiantes(data);
        } catch (error) {
            console.error("Error cargando estudiantes", error);
        } finally {
            setLoading(false);
        }
    };

    const crear = async (data: Omit<Estudiante, 'id'>) => {
        await estudianteService.create(data);
        await loadEstudiantes();
    };

    const actualizar = async (id: string, data: Omit<Estudiante, 'id'>) => {
        await estudianteService.update(id, data);
        await loadEstudiantes();
    };

    const eliminar = async (id: string) => {
        if (!confirm("¿Borrar estudiante?")) return;
        await estudianteService.delete(id);
        await loadEstudiantes();
    };

    useEffect(() => { loadEstudiantes(); }, []);

    return { estudiantes, loading, crear, actualizar, eliminar };
};
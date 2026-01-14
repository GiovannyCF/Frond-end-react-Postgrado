import { useState, useEffect } from "react";
import type { Modulo } from "../types";
import { moduloService } from "../services/moduloService";

export const useModulos = () => {
    const [modulos, setModulos] = useState<Modulo[]>([]);
    const [loading, setLoading] = useState(false);

    const loadModulos = async () => {
        setLoading(true);
        try {
            const data = await moduloService.getAll();
            setModulos(data);
        } catch (error) {
            console.error("Error al cargar módulos", error);
        } finally {
            setLoading(false);
        }
    };

    const crear = async (data: Omit<Modulo, 'id'>) => {
        await moduloService.create(data);
        await loadModulos();
    };

    const actualizar = async (id: string, data: Omit<Modulo, 'id'>) => {
        await moduloService.update(id, data);
        await loadModulos();
    };

    const eliminar = async (id: string) => {
        if (!confirm("¿Eliminar este módulo?")) return;
        await moduloService.delete(id);
        await loadModulos();
    };

    useEffect(() => {
        loadModulos();
    }, []);

    return { modulos, loading, crear, actualizar, eliminar };
};
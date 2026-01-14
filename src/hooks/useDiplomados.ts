import { useState, useEffect } from "react";
import type { Diplomado } from "../types";
import { diplomadoService } from "../services/diplomadoService";

export const useDiplomados = () => {
    const [diplomados, setDiplomados] = useState<Diplomado[]>([]);
    const [loading, setLoading] = useState(false);

    const loadDiplomados = async () => {
        setLoading(true);
        try {
            const data = await diplomadoService.getAll();
            setDiplomados(data);
        } catch (error) { console.error(error); } 
        finally { setLoading(false); }
    };

    const crear = async (data: Omit<Diplomado, 'id'>) => {
        await diplomadoService.create(data);
        await loadDiplomados();
    };

    const actualizar = async (id: string, data: Omit<Diplomado, 'id'>) => {
        await diplomadoService.update(id, data);
        await loadDiplomados();
    };

    const eliminar = async (id: string) => {
        if (!confirm("¿Eliminar diplomado?")) return;
        await diplomadoService.delete(id);
        await loadDiplomados();
    };

    useEffect(() => { loadDiplomados(); }, []);

    return { diplomados, loading, crear, actualizar, eliminar };
};
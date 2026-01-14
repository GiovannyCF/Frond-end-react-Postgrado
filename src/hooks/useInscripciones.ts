import { useState, useEffect } from "react";
import type { Inscripcion } from "../types";
import { inscripcionService } from "../services/inscripcionService";

export const useInscripciones = () => {
    const [inscripciones, setInscripciones] = useState<Inscripcion[]>([]);
    const [loading, setLoading] = useState(false);

    const load = async () => {
        setLoading(true);
        try {
            const data = await inscripcionService.getAll();
            setInscripciones(data);
        } catch (error) { console.error(error); } 
        finally { setLoading(false); }
    };

    const crear = async (data: Omit<Inscripcion, 'id'>) => {
        await inscripcionService.create(data);
        await load();
    };

    const actualizar = async (id: string, data: Omit<Inscripcion, 'id'>) => {
        await inscripcionService.update(id, data);
        await load();
    };

    const eliminar = async (id: string) => {
        await inscripcionService.delete(id);
        await load();
    };

    useEffect(() => { load(); }, []);

    return { inscripciones, loading, crear, actualizar, eliminar };
};
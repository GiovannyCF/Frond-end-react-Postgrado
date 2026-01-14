import { useState } from "react";
import { useInscripciones } from "../hooks/useInscripciones";
import { useEstudiantes } from "../hooks/useEstudiantes";
import { useDiplomados } from "../hooks/useDiplomados"; 
import { InscripcionList } from "../components/InscripcionList";
import { InscripcionForm } from "../components/InscripcionForm";
import type { Inscripcion } from "../types";

export const InscripcionPage = () => {
    const { inscripciones, loading, crear, actualizar, eliminar } = useInscripciones();
    const { estudiantes } = useEstudiantes();
    const { diplomados } = useDiplomados();
    const [itemEditando, setItemEditando] = useState<Inscripcion | null>(null);

    const handleSave = async (data: Omit<Inscripcion, 'id'>, id?: string) => {
        if (id) {
            await actualizar(id, data);
            setItemEditando(null);
        } else {
            await crear(data);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Gestión de Inscripciones</h1>
            <div style={{ display: "flex", gap: "20px" }}>
                <div style={{ flex: 1 }}>
                    <InscripcionForm 
                        onSave={handleSave} 
                        itemToEdit={itemEditando} 
                        onCancel={() => setItemEditando(null)}
                        estudiantes={estudiantes}
                        diplomados={diplomados}
                    />
                </div>
                <div style={{ flex: 2 }}>
                    {loading ? <p>Cargando...</p> : <InscripcionList lista={inscripciones} onEdit={setItemEditando} onDelete={eliminar} />}
                </div>
            </div>
        </div>
    );
};
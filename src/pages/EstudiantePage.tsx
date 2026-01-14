import { useState } from "react";
import { useEstudiantes } from "../hooks/useEstudiantes";
import { EstudianteList } from "../components/EstudianteList";
import { EstudianteForm } from "../components/EstudianteForm";
import type { Estudiante } from "../types";

export const EstudiantePage = () => {
    const { estudiantes, loading, crear, actualizar, eliminar } = useEstudiantes();
    const [itemEditando, setItemEditando] = useState<Estudiante | null>(null);

    const handleSave = async (data: Omit<Estudiante, 'id'>, id?: string) => {
        if (id) {
            await actualizar(id, data);
            setItemEditando(null);
        } else {
            await crear(data);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Gestión de Estudiantes</h1>
            <div style={{ display: "flex", gap: "20px" }}>
                <div style={{ flex: 1 }}>
                    <EstudianteForm onSave={handleSave} itemToEdit={itemEditando} onCancel={() => setItemEditando(null)} />
                </div>
                <div style={{ flex: 2 }}>
                    {loading ? <p>Cargando...</p> : <EstudianteList lista={estudiantes} onEdit={setItemEditando} onDelete={eliminar} />}
                </div>
            </div>
        </div>
    );
};
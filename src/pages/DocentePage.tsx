import { useState } from "react";
import { useDocentes } from "../hooks/useDocentes";
import { DocenteList } from "../components/DocenteList";
import { DocenteForm } from "../components/DocenteForm";
import type { Docente } from "../types";

export const DocentePage = () => {
    const { docentes, loading, crear, actualizar, eliminar } = useDocentes();
    const [itemEditando, setItemEditando] = useState<Docente | null>(null);

    const handleSave = async (data: Omit<Docente, 'id'>, id?: string) => {
        if (id) {
            await actualizar(id, data);
            setItemEditando(null);
        } else {
            await crear(data);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Gestión de Docentes</h1>
            <div style={{ display: "flex", gap: "20px" }}>
                <div style={{ flex: 1 }}>
                    <DocenteForm 
                        onSave={handleSave} 
                        itemToEdit={itemEditando} 
                        onCancel={() => setItemEditando(null)} 
                    />
                </div>
                <div style={{ flex: 2 }}>
                    {loading ? <p>Cargando...</p> : (
                        <DocenteList 
                            lista={docentes} 
                            onEdit={setItemEditando} 
                            onDelete={eliminar} 
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
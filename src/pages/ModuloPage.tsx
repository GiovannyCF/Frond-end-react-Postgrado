import { useState } from "react";
import { useModulos } from "../hooks/useModulos";
import { useDocentes } from "../hooks/useDocentes";
import { useDiplomados } from "../hooks/useDiplomados"; 
import { ModuloList } from "../components/ModuloList";
import { ModuloForm } from "../components/ModuloForm";
import type { Modulo } from "../types";

export const ModuloPage = () => {
    const { modulos, loading, crear, actualizar, eliminar } = useModulos();
    const { docentes } = useDocentes();     
    const { diplomados } = useDiplomados(); 

    const [itemEditando, setItemEditando] = useState<Modulo | null>(null);

    const handleSave = async (data: Omit<Modulo, 'id'>, id?: string) => {
        if (id) {
            await actualizar(id, data);
            setItemEditando(null);
        } else {
            await crear(data);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Gestión de Módulos</h1>
            <div style={{ display: "flex", gap: "20px" }}>
                <div style={{ flex: 1 }}>
                    <ModuloForm 
                        onSave={handleSave} 
                        itemToEdit={itemEditando} 
                        onCancel={() => setItemEditando(null)}
                        docentes={docentes}
                        diplomados={diplomados}
                    />
                </div>
                <div style={{ flex: 2 }}>
                    {loading ? <p>Cargando...</p> : (
                        <ModuloList 
                            lista={modulos} 
                            onEdit={setItemEditando} 
                            onDelete={eliminar} 
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
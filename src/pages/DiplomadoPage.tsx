import { useState } from "react";
import { useDiplomados } from "../hooks/useDiplomados";
import { DiplomadoList } from "../components/DiplomadoList"; 
import { DiplomadoForm } from "../components/DiplomadoForm";
import type { Diplomado } from "../types";

export const DiplomadoPage = () => {
    const { diplomados, loading, crear, actualizar, eliminar } = useDiplomados();
    const [itemEditando, setItemEditando] = useState<Diplomado | null>(null);

    const handleSave = async (data: Omit<Diplomado, 'id'>, id?: string) => {
        if (id) {
            await actualizar(id, data);
            setItemEditando(null); 
        } else {
            await crear(data);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Gestión de Diplomados</h1>
            
            <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
                <div style={{ padding: "10px", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
                    <DiplomadoForm 
                        onSave={handleSave} 
                        itemToEdit={itemEditando} 
                        onCancel={() => setItemEditando(null)}
                    />
                </div>

                <div>
                    {loading ? (
                        <p>Cargando datos...</p>
                    ) : (
                        <DiplomadoList 
                            lista={diplomados} 
                            onEdit={(item) => setItemEditando(item)} 
                            onDelete={(id) => eliminar(id)} 
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
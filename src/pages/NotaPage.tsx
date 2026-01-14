import { useState } from "react";
import { useNotas } from "../hooks/useNotas";
import { useModulos } from "../hooks/useModulos";
import { useInscripciones } from "../hooks/useInscripciones";
import { NotaList } from "../components/NotaList";
import { NotaForm } from "../components/NotaForm"; // Ya lo tenías creado
import type { Nota } from "../types";

export const NotaPage = () => {
    const { notas, loading, crear, actualizar, eliminar } = useNotas();
    const { modulos } = useModulos();
    const { inscripciones } = useInscripciones();
    const [itemEditando, setItemEditando] = useState<Nota | null>(null);

    const handleSave = async (data: Omit<Nota, 'id'>, id?: string) => {
        if (id) {
            await actualizar(id, data);
            setItemEditando(null);
        } else {
            await crear(data);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Registro de Notas</h1>
            <div style={{ display: "flex", gap: "20px" }}>
                <div style={{ flex: 1 }}>
                    <NotaForm 
                        onSave={handleSave} 
                        itemToEdit={itemEditando} 
                        onCancel={() => setItemEditando(null)}
                        modulos={modulos}
                        inscripciones={inscripciones}
                    />
                </div>
                <div style={{ flex: 2 }}>
                    {loading ? <p>Cargando...</p> : <NotaList lista={notas} onEdit={setItemEditando} onDelete={eliminar} />}
                </div>
            </div>
        </div>
    );
};
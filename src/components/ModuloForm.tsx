import { useState, useEffect } from "react";
import type { Modulo, Diplomado, Docente } from "../types";

interface Props {
    onSave: (data: Omit<Modulo, 'id'>, id?: string) => void;
    itemToEdit: Modulo | null;
    onCancel: () => void;
    // Necesitamos estas listas para los <select>
    diplomados: Diplomado[];
    docentes: Docente[];
}

const initialState = { 
    nombre: "", 
    fechaInicio: "", 
    fechaFin: "", 
    diplomadoId: "", 
    docenteId: "" 
};

export const ModuloForm = ({ onSave, itemToEdit, onCancel, diplomados, docentes }: Props) => {
    const [form, setForm] = useState(initialState);

    useEffect(() => {
        if (itemToEdit) {
            setForm({
                ...itemToEdit,
                fechaInicio: itemToEdit.fechaInicio.split('T')[0], // Formato YYYY-MM-DD
                fechaFin: itemToEdit.fechaFin.split('T')[0]
            });
        } else {
            setForm(initialState);
        }
    }, [itemToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSave(form, itemToEdit?.id); }} style={{ display: "grid", gap: "10px", padding: "10px", border: "1px solid #ccc" }}>
            <h3>Gestión de Módulos</h3>
            
            <input name="nombre" placeholder="Nombre del Módulo" value={form.nombre} onChange={handleChange} required />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div>
                    <label>Fecha Inicio:</label>
                    <input name="fechaInicio" type="date" value={form.fechaInicio} onChange={handleChange} required />
                </div>
                <div>
                    <label>Fecha Fin:</label>
                    <input name="fechaFin" type="date" value={form.fechaFin} onChange={handleChange} required />
                </div>
            </div>

            <label>Pertenece al Diplomado:</label>
            <select name="diplomadoId" value={form.diplomadoId} onChange={handleChange} required>
                <option value="">-- Seleccione --</option>
                {diplomados.map(d => <option key={d.id} value={d.id}>{d.nombre}</option>)}
            </select>

            <label>Docente encargado:</label>
            <select name="docenteId" value={form.docenteId} onChange={handleChange} required>
                <option value="">-- Seleccione --</option>
                {docentes.map(d => <option key={d.id} value={d.id}>{d.nombre} {d.apellido}</option>)}
            </select>

            <button type="submit">{itemToEdit ? "Guardar Cambios" : "Crear Módulo"}</button>
            {itemToEdit && <button type="button" onClick={onCancel}>Cancelar</button>}
        </form>
    );
};
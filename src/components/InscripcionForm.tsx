import { useState, useEffect } from "react";
import type { Inscripcion, Estudiante, Diplomado } from "../types";

interface Props {
    onSave: (data: Omit<Inscripcion, 'id'>, id?: string) => void;
    itemToEdit: Inscripcion | null;
    onCancel: () => void;
    estudiantes: Estudiante[];
    diplomados: Diplomado[];
}

const initialState = { 
    fechaInscripcion: new Date().toISOString().split('T')[0], 
    terminoDiplomado: false, 
    diplomaEntregado: false, 
    estudianteId: "", 
    diplomadoId: "" 
};

export const InscripcionForm = ({ onSave, itemToEdit, onCancel, estudiantes, diplomados }: Props) => {
    const [form, setForm] = useState(initialState);

    useEffect(() => {
        if (itemToEdit) setForm({
            ...itemToEdit,
            fechaInscripcion: itemToEdit.fechaInscripcion.split('T')[0]
        });
        else setForm(initialState);
    }, [itemToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
        setForm({ ...form, [e.target.name]: value });
    };

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSave(form, itemToEdit?.id); }} style={{ display: "grid", gap: "10px" }}>
            <h3>Inscribir Estudiante</h3>
            
            <label>Estudiante:</label>
            <select name="estudianteId" value={form.estudianteId} onChange={handleChange} required>
                <option value="">-- Seleccione --</option>
                {estudiantes.map(e => <option key={e.id} value={e.id}>{e.nombre} {e.apellido}</option>)}
            </select>

            <label>Diplomado:</label>
            <select name="diplomadoId" value={form.diplomadoId} onChange={handleChange} required>
                <option value="">-- Seleccione --</option>
                {diplomados.map(d => <option key={d.id} value={d.id}>{d.nombre}</option>)}
            </select>

            <label>Fecha:</label>
            <input name="fechaInscripcion" type="date" value={form.fechaInscripcion} onChange={handleChange} required />

            <div style={{display:'flex', gap:'10px'}}>
                <label><input type="checkbox" name="terminoDiplomado" checked={form.terminoDiplomado} onChange={handleChange} /> Terminó Diplomado</label>
                <label><input type="checkbox" name="diplomaEntregado" checked={form.diplomaEntregado} onChange={handleChange} /> Diploma Entregado</label>
            </div>

            <button type="submit">Guardar</button>
            {itemToEdit && <button type="button" onClick={onCancel}>Cancelar</button>}
        </form>
    );
};
import { useState, useEffect } from "react";
import type { Nota, Inscripcion, Modulo } from "../types";

interface Props {
    onSave: (data: Omit<Nota, 'id'>, id?: string) => void;
    itemToEdit: Nota | null;
    onCancel: () => void;
    inscripciones: Inscripcion[];
    modulos: Modulo[];
}

const initialState = { valor: 0, inscripcionId: "", moduloId: "" };

export const NotaForm = ({ onSave, itemToEdit, onCancel, inscripciones, modulos }: Props) => {
    const [form, setForm] = useState(initialState);

    useEffect(() => {
        if (itemToEdit) setForm(itemToEdit);
        else setForm(initialState);
    }, [itemToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSave(form, itemToEdit?.id); }}>
            <h3>Registrar Nota</h3>
            
            <label>Inscripción (Estudiante):</label>
            <select name="inscripcionId" value={form.inscripcionId} onChange={handleChange} required>
                <option value="">-- Seleccione Inscripción --</option>
                {inscripciones.map(i => (
                    <option key={i.id} value={i.id}>Inscripción: {i.fechaInscripcion.split('T')[0]}</option>
                ))}
            </select>

            <label>Módulo:</label>
            <select name="moduloId" value={form.moduloId} onChange={handleChange} required>
                <option value="">-- Seleccione Módulo --</option>
                {modulos.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
            </select>

            <label>Nota (0-100):</label>
            <input name="valor" type="number" value={form.valor} onChange={handleChange} required min="0" max="100" />

            <button type="submit">Guardar</button>
            {itemToEdit && <button type="button" onClick={onCancel}>Cancelar</button>}
        </form>
    );
};
import { useState, useEffect } from "react";
import type { Docente } from "../types";

interface Props {
    onSave: (data: Omit<Docente, 'id'>, id?: string) => void;
    itemToEdit: Docente | null;
    onCancel: () => void;
}

const initialState = { nombre: "", apellido: "", telefono: "", email: "", curriculum: "" };

export const DocenteForm = ({ onSave, itemToEdit, onCancel }: Props) => {
    const [form, setForm] = useState(initialState);

    useEffect(() => {
        if (itemToEdit) setForm(itemToEdit);
        else setForm(initialState);
    }, [itemToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px" }}>
            <h3>{itemToEdit ? "Editar Docente" : "Nuevo Docente"}</h3>
            <form onSubmit={(e) => { e.preventDefault(); onSave(form, itemToEdit?.id); }} style={{ display: "grid", gap: "10px" }}>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
                    <input name="apellido" placeholder="Apellido" value={form.apellido} onChange={handleChange} required />
                </div>

                <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                <input name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} required />
                
                <textarea name="curriculum" placeholder="Resumen Curricular" value={form.curriculum} onChange={handleChange} rows={3} />

                <div style={{ marginTop: "10px" }}>
                    <button type="submit">{itemToEdit ? "Actualizar" : "Guardar"}</button>
                    {itemToEdit && <button type="button" onClick={onCancel} style={{ marginLeft: "10px" }}>Cancelar</button>}
                </div>
            </form>
        </div>
    );
};
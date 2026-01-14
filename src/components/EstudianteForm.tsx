import { useState, useEffect } from "react";
import type { Estudiante } from "../types";

interface Props {
    onSave: (data: Omit<Estudiante, 'id'>, id?: string) => void;
    itemToEdit: Estudiante | null;
    onCancel: () => void;
}

const initialState = { nombre: "", apellido: "", ci: "", telefono: "", tituloProfesionalUrl: "", tituloProvisionNacionalUrl: "", certificadoNacimientoUrl: "", fotoUrl: "" };

export const EstudianteForm = ({ onSave, itemToEdit, onCancel }: Props) => {
    const [form, setForm] = useState(initialState);

    useEffect(() => {
        if (itemToEdit) setForm(itemToEdit);
        else setForm(initialState);
    }, [itemToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSave(form, itemToEdit?.id); }} style={{ display: "grid", gap: "10px" }}>
            <h3>Datos del Estudiante</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
                <input name="apellido" placeholder="Apellido" value={form.apellido} onChange={handleChange} required />
            </div>
            <input name="ci" placeholder="Cédula de Identidad" value={form.ci} onChange={handleChange} required />
            <input name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} required />
            
            {/* Por ahora manejamos las URLs como texto simple */}
            <input name="fotoUrl" placeholder="URL Foto" value={form.fotoUrl} onChange={handleChange} />
            
            <button type="submit">{itemToEdit ? "Actualizar" : "Registrar"}</button>
            {itemToEdit && <button type="button" onClick={onCancel}>Cancelar</button>}
        </form>
    );
};
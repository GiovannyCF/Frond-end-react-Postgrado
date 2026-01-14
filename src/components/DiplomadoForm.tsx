import { useState, useEffect } from "react";
import type { Diplomado } from "../types";

interface Props {
    onSave: (data: Omit<Diplomado, 'id'>, id?: string) => void;
    itemToEdit: Diplomado | null;
    onCancel: () => void;
}

const initialState = { 
    nombre: "", 
    version: 1, 
    costo: 0, 
    fechaInicio: "", 
    fechaFin: "" 
};

export const DiplomadoForm = ({ onSave, itemToEdit, onCancel }: Props) => {
    const [form, setForm] = useState(initialState);

    useEffect(() => {
        if (itemToEdit) {
            setForm({
                ...itemToEdit,
                fechaInicio: itemToEdit.fechaInicio.split('T')[0],
                fechaFin: itemToEdit.fechaFin.split('T')[0]
            });
        } else {
            setForm(initialState);
        }
    }, [itemToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(form, itemToEdit?.id);
        if (!itemToEdit) setForm(initialState);
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "10px" }}>
            <h3>{itemToEdit ? "Editar Diplomado" : "Nuevo Diplomado"}</h3>
            
            <input 
                name="nombre" 
                placeholder="Nombre del Diplomado" 
                value={form.nombre} 
                onChange={handleChange} 
                required 
            />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <input 
                    name="version" 
                    type="number" 
                    placeholder="Versión (ej: 1)" 
                    value={form.version} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    name="costo" 
                    type="number" 
                    placeholder="Costo (Bs)" 
                    value={form.costo} 
                    onChange={handleChange} 
                    required 
                />
            </div>

            <label>Fecha de Inicio:</label>
            <input 
                name="fechaInicio" 
                type="date" 
                value={form.fechaInicio} 
                onChange={handleChange} 
                required 
            />

            <label>Fecha de Finalización:</label>
            <input 
                name="fechaFin" 
                type="date" 
                value={form.fechaFin} 
                onChange={handleChange} 
                required 
            />

            <div style={{ marginTop: "10px" }}>
                <button type="submit" style={{ cursor: "pointer", padding: "8px 16px" }}>
                    {itemToEdit ? "Actualizar" : "Guardar"}
                </button>
                
                {itemToEdit && (
                    <button 
                        type="button" 
                        onClick={onCancel} 
                        style={{ marginLeft: "10px", cursor: "pointer", padding: "8px 16px" }}
                    >
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
};
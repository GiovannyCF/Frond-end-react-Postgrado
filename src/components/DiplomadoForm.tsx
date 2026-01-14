import { useState, useEffect } from "react";
import type { Diplomado } from "../types";

interface Props {
    onSave: (data: Omit<Diplomado, 'id'>, id?: string) => void;
    itemToEdit: Diplomado | null;
    onCancel: () => void;
}

const initialState = { 
    nombre: "", 
    version: "", 
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

        // 1. VALIDACIÓN: Evitar fechas vacías
        if (!form.fechaInicio || !form.fechaFin) {
            alert("⚠️ Por favor selecciona ambas fechas");
            return;
        }

        // 2. CONVERSIÓN DE TIPOS (La solución al Error 400)
        const dataToSend = {
            ...form,
            // Tu backend pide Version como String y Costo como Number
            version: String(form.version), 
            costo: Number(form.costo)
        };

        console.log("📤 Enviando:", dataToSend);
        
        onSave(dataToSend, itemToEdit?.id);
        
        if (!itemToEdit) setForm(initialState);
    };

    // Estilos reutilizables
    const inputStyle = {
        width: "100%",
        padding: "8px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        boxSizing: "border-box" as const
    };

    const labelStyle = {
        display: "block",
        marginBottom: "5px",
        fontWeight: "bold",
        fontSize: "0.9em",
        color: "#555"
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "15px" }}>
            <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>
                {itemToEdit ? "Editar Diplomado" : "Nuevo Diplomado"}
            </h3>
            
            {/* NOMBRE */}
            <div>
                <label style={labelStyle}>Nombre del Diplomado:</label>
                <input 
                    name="nombre" 
                    placeholder="Ej: Diplomado en Seguridad Informática" 
                    value={form.nombre} 
                    onChange={handleChange} 
                    required 
                    style={inputStyle}
                />
            </div>

            {/* VERSIÓN Y COSTO (Lado a Lado) */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div>
                    <label style={labelStyle}>Versión:</label>
                    <input 
                        name="version" 
                        placeholder="1" 
                        value={form.version} 
                        onChange={handleChange} 
                        required 
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label style={labelStyle}>Costo (Bs):</label>
                    <input 
                        name="costo" 
                        type="number" 
                        placeholder="0.00" 
                        value={form.costo} 
                        onChange={handleChange} 
                        required 
                        style={inputStyle}
                    />
                </div>
            </div>

            {/* FECHAS (Lado a Lado) */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div>
                    <label style={labelStyle}>Fecha de Inicio:</label>
                    <input 
                        name="fechaInicio" 
                        type="date" 
                        value={form.fechaInicio} 
                        onChange={handleChange} 
                        required 
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label style={labelStyle}>Fecha de Finalización:</label>
                    <input 
                        name="fechaFin" 
                        type="date" 
                        value={form.fechaFin} 
                        onChange={handleChange} 
                        required 
                        style={inputStyle}
                    />
                </div>
            </div>

            {/* BOTONES */}
            <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                <button type="submit" style={{ 
                    cursor: "pointer", 
                    padding: "10px 20px", 
                    backgroundColor: "#007bff", 
                    color: "white", 
                    border: "none", 
                    borderRadius: "4px",
                    fontWeight: "bold"
                }}>
                    {itemToEdit ? "Actualizar" : "Guardar"}
                </button>
                
                {itemToEdit && (
                    <button 
                        type="button" 
                        onClick={onCancel} 
                        style={{ 
                            cursor: "pointer", 
                            padding: "10px 20px", 
                            backgroundColor: "#6c757d", 
                            color: "white", 
                            border: "none", 
                            borderRadius: "4px"
                        }}
                    >
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
};
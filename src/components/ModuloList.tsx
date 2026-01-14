import type { Modulo } from "../types";

interface Props {
    lista: Modulo[];
    onEdit: (item: Modulo) => void;
    onDelete: (id: string) => void;
}

export const ModuloList = ({ lista, onEdit, onDelete }: Props) => {
    return (
        <table border={1} style={{ width: '100%', marginTop: '10px', borderCollapse: "collapse" }}>
            <thead style={{ backgroundColor: "#f2f2f2" }}>
                <tr>
                    <th style={{ padding: "10px" }}>Nombre del Módulo</th>
                    <th style={{ padding: "10px" }}>Fechas</th>
                    <th style={{ padding: "10px" }}>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {lista.map((item) => (
                    <tr key={item.id}>
                        <td style={{ padding: "8px" }}>
                            <strong>{item.nombre}</strong>
                        </td>
                        <td style={{ padding: "8px" }}>
                            Del: {new Date(item.fechaInicio).toLocaleDateString()} <br/>
                            Al: {new Date(item.fechaFin).toLocaleDateString()}
                        </td>
                        <td style={{ textAlign: "center", padding: "8px" }}>
                            <button onClick={() => onEdit(item)} style={{ marginRight: "5px" }}>✏️</button>
                            <button onClick={() => onDelete(item.id)} style={{ color: "red" }}>🗑️</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
import type { Docente } from "../types";

interface Props {
    lista: Docente[];
    onEdit: (item: Docente) => void;
    onDelete: (id: string) => void;
}

export const DocenteList = ({ lista, onEdit, onDelete }: Props) => {
    return (
        <div style={{ overflowX: "auto" }}>
            <table border={1} style={{ width: "100%", marginTop: "10px", borderCollapse: "collapse" }}>
                <thead style={{ backgroundColor: "#f2f2f2" }}>
                    <tr>
                        <th style={{ padding: "10px" }}>Nombre Completo</th>
                        <th style={{ padding: "10px" }}>Contacto</th>
                        <th style={{ padding: "10px" }}>Resumen</th>
                        <th style={{ padding: "10px" }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {lista.map((item) => (
                        <tr key={item.id}>
                            <td style={{ padding: "8px" }}>
                                {item.nombre} {item.apellido}
                            </td>
                            <td style={{ padding: "8px" }}>
                                📧 {item.email} <br/>
                                📞 {item.telefono}
                            </td>
                            <td style={{ padding: "8px" }}>
                                <small>{(item.curriculum || "Sin info").substring(0, 50)}...</small>
                            </td>
                            <td style={{ textAlign: "center", padding: "8px" }}>
                                <button onClick={() => onEdit(item)} style={{ marginRight: "5px" }}>✏️</button>
                                <button onClick={() => onDelete(item.id)} style={{ color: "red" }}>🗑️</button>
                            </td>
                        </tr>
                    ))}
                    {lista.length === 0 && (
                        <tr>
                            <td colSpan={4} style={{ textAlign: "center", padding: "20px" }}>
                                No hay docentes registrados.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
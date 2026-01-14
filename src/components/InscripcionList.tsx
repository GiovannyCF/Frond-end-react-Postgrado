import type { Inscripcion } from "../types";

interface Props {
    lista: Inscripcion[];
    onEdit: (item: Inscripcion) => void;
    onDelete: (id: string) => void;
}

export const InscripcionList = ({ lista, onEdit, onDelete }: Props) => (
    <table border={1} style={{ width: "100%", marginTop: "10px" }}>
        <thead>
            <tr>
                <th>Fecha</th>
                <th>Diplomado ID</th>
                <th>Estudiante ID</th>
                <th>Estado</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            {lista.map(item => (
                <tr key={item.id}>
                    <td>{new Date(item.fechaInscripcion).toLocaleDateString()}</td>
                    <td>{item.diplomadoId}</td>
                    <td>{item.estudianteId}</td>
                    <td>
                        {item.terminoDiplomado ? "✅ Terminó" : "⏳ Cursando"} <br/>
                        {item.diplomaEntregado ? "🎓 Entregado" : "📄 Pendiente"}
                    </td>
                    <td>
                        <button onClick={() => onEdit(item)}>✏️</button>
                        <button onClick={() => onDelete(item.id)}>🗑️</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);
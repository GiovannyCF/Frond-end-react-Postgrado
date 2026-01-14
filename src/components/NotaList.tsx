import type { Nota } from "../types";

interface Props {
    lista: Nota[];
    onEdit: (item: Nota) => void;
    onDelete: (id: string) => void;
}

export const NotaList = ({ lista, onEdit, onDelete }: Props) => (
    <table border={1} style={{ width: "100%", marginTop: "10px" }}>
        <thead>
            <tr>
                <th>Módulo ID</th>
                <th>Inscripción ID</th>
                <th>Valor</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            {lista.map(item => (
                <tr key={item.id}>
                    <td>{item.moduloId}</td>
                    <td>{item.inscripcionId}</td>
                    <td><strong>{item.valor}</strong></td>
                    <td>
                        <button onClick={() => onEdit(item)}>✏️</button>
                        <button onClick={() => onDelete(item.id)}>🗑️</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);
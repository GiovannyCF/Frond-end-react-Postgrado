import type { Estudiante } from "../types";

interface Props {
    lista: Estudiante[];
    onEdit: (item: Estudiante) => void;
    onDelete: (id: string) => void;
}

export const EstudianteList = ({ lista, onEdit, onDelete }: Props) => (
    <table border={1} style={{ width: "100%", marginTop: "10px" }}>
        <thead>
            <tr>
                <th>Nombre Completo</th>
                <th>C.I.</th>
                <th>Teléfono</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            {lista.map(item => (
                <tr key={item.id}>
                    <td>{item.nombre} {item.apellido}</td>
                    <td>{item.ci}</td>
                    <td>{item.telefono}</td>
                    <td>
                        <button onClick={() => onEdit(item)}>✏️</button>
                        <button onClick={() => onDelete(item.id)}>🗑️</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);
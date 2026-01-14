import type { Diplomado } from "../types";

interface Props {
    lista: Diplomado[];
    onEdit: (item: Diplomado) => void;
    onDelete: (id: string) => void;
}

export const DiplomadoList = ({ lista, onEdit, onDelete }: Props) => {
    return (
        <div style={{ overflowX: "auto" }}>
            <table border={1} style={{ width: "100%", marginTop: "10px", borderCollapse: "collapse" }}>
                <thead style={{ backgroundColor: "#f2f2f2" }}>
                    <tr>
                        <th style={{ padding: "10px" }}>Nombre</th>
                        <th style={{ padding: "10px" }}>Ver.</th>
                        <th style={{ padding: "10px" }}>Costo</th>
                        <th style={{ padding: "10px" }}>Duración</th>
                        <th style={{ padding: "10px" }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {lista.map((item) => (
                        <tr key={item.id}>
                            <td style={{ padding: "8px" }}>
                                {item.nombre}
                            </td>
                            <td style={{ textAlign: "center", padding: "8px" }}>
                                {item.version}
                            </td>
                            <td style={{ textAlign: "right", padding: "8px" }}>
                                {item.costo} Bs.
                            </td>
                            <td style={{ padding: "8px", fontSize: "0.9em" }}>
                                Del: {new Date(item.fechaInicio).toLocaleDateString()} <br/>
                                Al: {new Date(item.fechaFin).toLocaleDateString()}
                            </td>
                            <td style={{ textAlign: "center", padding: "8px" }}>
                                <button 
                                    onClick={() => onEdit(item)} 
                                    style={{ marginRight: "5px", cursor: "pointer" }}
                                >
                                    ✏️
                                </button>
                                <button 
                                    onClick={() => onDelete(item.id)} 
                                    style={{ color: "red", cursor: "pointer" }}
                                >
                                    🗑️
                                </button>
                            </td>
                        </tr>
                    ))}
                    {lista.length === 0 && (
                        <tr>
                            <td colSpan={5} style={{ textAlign: "center", padding: "20px" }}>
                                No hay diplomados registrados.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
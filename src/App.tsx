import { useEffect, useState } from 'react';
import './App.css'; // Asegúrate de que este archivo exista, si no, borra esta línea

// 1. Definimos el "Contrato" (Igual que tu DTO en C#)
// Nota: Los Guid de C# se convierten en string en TypeScript
interface Diplomado {
  id: string;
  nombre: string;
  costo: number; // decimal se convierte en number
  // Puedes agregar más campos si quieres mostrarlos (version, fechaInicio, etc.)
}

function App() {
  // 2. Le decimos al estado que guardará un ARRAY de Diplomados
  const [diplomados, setDiplomados] = useState<Diplomado[]>([]);

  // 3. Pega aquí tu URL de Swagger (Backend)
  const URL_API = "https://localhost:7043/api/Diplomado"; 

  useEffect(() => {
    fetch(URL_API)
      .then(response => response.json())
      .then((data: Diplomado[]) => {
        console.log("Datos recibidos del Backend:", data);
        setDiplomados(data);
      })
      .catch(error => console.error("Error conectando:", error));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>🎓 Lista de Diplomados</h1>
      <h3>Conectado a .NET Core</h3>
      
      {/* Si la lista está vacía, mostramos un mensaje */}
      {diplomados.length === 0 ? (
        <p>Cargando datos o no hay diplomados...</p>
      ) : (
        <ul>
          {diplomados.map((item) => (
            <li key={item.id} style={{ marginBottom: "10px" }}>
              <strong>{item.nombre}</strong> - Precio: {item.costo} Bs.
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
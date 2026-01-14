import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { DiplomadoPage } from "./pages/DiplomadoPage";
import { DocentePage } from "./pages/DocentePage";
import { EstudiantePage } from "./pages/EstudiantePage";
import { ModuloPage } from "./pages/ModuloPage";
import { InscripcionPage } from "./pages/InscripcionPage";
import { NotaPage } from "./pages/NotaPage";

const Navbar = () => (
  <nav style={{ padding: "15px", backgroundColor: "#2c3e50", marginBottom: "20px" }}>
    <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
      <Link to="/" style={linkStyle}>🎓 Diplomados</Link>
      <Link to="/docentes" style={linkStyle}>👨‍🏫 Docentes</Link>
      <Link to="/estudiantes" style={linkStyle}>🧑‍🎓 Estudiantes</Link>
      <Link to="/modulos" style={linkStyle}>📚 Módulos</Link>
      <Link to="/inscripciones" style={linkStyle}>📝 Inscripciones</Link>
      <Link to="/notas" style={linkStyle}>📊 Notas</Link>
    </div>
  </nav>
);

const linkStyle = { color: "white", textDecoration: "none", fontWeight: "bold", fontSize: "16px" };

function App() {
  return (
    <BrowserRouter>
      <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
        <Navbar />
        
        <div style={{ width: "100%", padding: "0 20px", boxSizing: "border-box" }}>
          <Routes>
            <Route path="/" element={<DiplomadoPage />} />
            <Route path="/docentes" element={<DocentePage />} />
            <Route path="/estudiantes" element={<EstudiantePage />} />
            <Route path="/modulos" element={<ModuloPage />} />
            <Route path="/inscripciones" element={<InscripcionPage />} />
            <Route path="/notas" element={<NotaPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
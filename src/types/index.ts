
export interface Docente {
    id: string;
    nombre: string;
    apellido: string;
    telefono: string;     
    email: string;        
    curriculum: string;   
}

export interface Estudiante {
    id: string;
    nombre: string;
    apellido: string;
    telefono: string;     
    ci: string;           
    tituloProfesionalUrl: string;
    tituloProvisionNacionalUrl: string;
    certificadoNacimientoUrl: string;
    fotoUrl: string;
}

export interface Diplomado {
    id: string;
    nombre: string;
    version: number;
    fechaInicio: string; 
    fechaFin: string;
    costo: number;
}

export interface Modulo {
    id: string;
    nombre: string;
    fechaInicio: string;  
    fechaFin: string;     
    diplomadoId: string;  
    docenteId: string;    
}

export interface Inscripcion {
    id: string;
    fechaInscripcion: string;
    terminoDiplomado: boolean;
    diplomaEntregado: boolean;
    estudianteId: string; 
    diplomadoId: string;  
}

export interface Nota {
    id: string;
    valor: number;
    inscripcionId: string; 
    moduloId: string;
}
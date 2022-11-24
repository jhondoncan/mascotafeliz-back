import { Entity } from '@loopback/repository';
import { Mascota } from './mascota.model';
export declare class Usuario extends Entity {
    id?: string;
    cedula: string;
    nombres: string;
    apellidos: string;
    telefono: string;
    correo: string;
    password: string;
    rol: string;
    mascotas: Mascota[];
    constructor(data?: Partial<Usuario>);
}
export interface UsuarioRelations {
}
export declare type UsuarioWithRelations = Usuario & UsuarioRelations;

import { Usuario } from '../models';
import { UsuarioRepository } from '../repositories';
export declare class AutenticacionService {
    usuarioRepository: UsuarioRepository;
    constructor(usuarioRepository: UsuarioRepository);
    generarClave(): any;
    cicrarClave(clave: string): any;
    identificarUsuario(correo: string, clave: string): false | Promise<(Usuario & import("../models").UsuarioRelations) | null>;
    generarTokenJWT(usuario: Usuario): any;
    verificarTokenJWT(token: string): any;
}

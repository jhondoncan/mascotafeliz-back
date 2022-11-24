import { UsuarioRepository } from '../repositories';
export declare class NotificacionService {
    usuarioRepository: UsuarioRepository;
    constructor(usuarioRepository: UsuarioRepository);
    enviarCorreo(destino: string, asunto: string, cuerpo: string): void;
    enviarSMS(destino: string, mensaje: string): void;
    enviarSMSTwilio(destino: string, mensaje: string): void;
}

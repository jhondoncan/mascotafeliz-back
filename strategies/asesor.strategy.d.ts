import { AuthenticationStrategy } from '@loopback/authentication';
import { UserProfile } from '@loopback/security';
import { Request } from 'express';
import { AutenticacionService } from '../services';
export declare class EstratgiaAsesor implements AuthenticationStrategy {
    servicioAutenticacion: AutenticacionService;
    name: string;
    constructor(servicioAutenticacion: AutenticacionService);
    authenticate(request: Request): Promise<UserProfile | undefined>;
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutenticacionService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const repositories_1 = require("../repositories");
const generador = require('password-generator');
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
let AutenticacionService = class AutenticacionService {
    constructor(usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }
    /*
     * Add service methods here
     */
    generarClave() {
        const clave = generador(8, false);
        return clave;
    }
    cicrarClave(clave) {
        const claveCifrada = cryptoJS.MD5(clave).toString();
        return claveCifrada;
    }
    identificarUsuario(correo, clave) {
        const claveCifrada = this.cicrarClave(clave);
        try {
            const p = this.usuarioRepository.findOne({
                where: { correo: correo, password: claveCifrada },
            });
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            if (p) {
                return p;
            }
            return false;
        }
        catch (_a) {
            return false;
        }
    }
    generarTokenJWT(usuario) {
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            data: {
                id: usuario.id,
                correo: usuario.correo,
                nombres: usuario.nombres,
                apellidos: usuario.apellidos,
                rol: usuario.rol,
            },
        }, process.env.CLAVE_JWT);
        return token;
    }
    verificarTokenJWT(token) {
        try {
            const decoded = jwt.verify(token, process.env.CLAVE_JWT);
            if (decoded) {
                return decoded;
            }
            return false;
        }
        catch (_a) {
            return false;
        }
    }
};
AutenticacionService = tslib_1.__decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.UsuarioRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UsuarioRepository])
], AutenticacionService);
exports.AutenticacionService = AutenticacionService;
//# sourceMappingURL=autenticacion.service.js.map
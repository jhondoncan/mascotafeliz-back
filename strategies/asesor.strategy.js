"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstratgiaAsesor = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const parse_bearer_token_1 = tslib_1.__importDefault(require("parse-bearer-token"));
const services_1 = require("../services");
let EstratgiaAsesor = class EstratgiaAsesor {
    constructor(servicioAutenticacion) {
        this.servicioAutenticacion = servicioAutenticacion;
        this.name = 'asesor';
    }
    async authenticate(request) {
        const token = (0, parse_bearer_token_1.default)(request);
        if (token) {
            const datos = this.servicioAutenticacion.verificarTokenJWT(token);
            if (datos) {
                const perfil = Object.assign({
                    id: datos.data.id,
                    nombre: datos.data.nombres,
                    rol: datos.data.rol,
                });
                return perfil;
            }
            else {
                throw new rest_1.HttpErrors[401]('Token no valido');
            }
        }
        else {
            throw new rest_1.HttpErrors[401]('No se ha enviado el token');
        }
    }
};
EstratgiaAsesor = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.service)(services_1.AutenticacionService)),
    tslib_1.__metadata("design:paramtypes", [services_1.AutenticacionService])
], EstratgiaAsesor);
exports.EstratgiaAsesor = EstratgiaAsesor;
//# sourceMappingURL=asesor.strategy.js.map
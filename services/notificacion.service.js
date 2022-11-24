"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificacionService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const repositories_1 = require("../repositories");
const sgMail = require('@sendgrid/mail');
const axios = require('axios');
require('dotenv').config();
let NotificacionService = class NotificacionService {
    constructor(
    /* Add @inject to inject parameters */
    usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }
    /*
     * Add service methods here
     */
    enviarCorreo(destino, asunto, cuerpo) {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: destino,
            from: process.env.CORREO_SENDGRID,
            subject: asunto,
            html: cuerpo,
        };
        sgMail
            .send(msg)
            .then(() => {
            console.log('Correo electrónico enviado');
        })
            .catch((error) => {
            console.error(error);
        });
    }
    enviarSMS(destino, mensaje) {
        const encodedParams = new URLSearchParams();
        encodedParams.append('to', `+57${destino}`);
        encodedParams.append('p', `${process.env.KEY_SMS}`);
        encodedParams.append('text', `${mensaje}`);
        const options = {
            method: 'POST',
            url: 'https://sms77io.p.rapidapi.com/sms',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': process.env.KEY_RAPIDAPI_SMS,
                'X-RapidAPI-Host': 'sms77io.p.rapidapi.com',
            },
            data: encodedParams,
        };
        axios
            .request(options)
            .then(function (response) {
            console.log(response.data);
        })
            .catch(function (error) {
            console.error(error);
        });
    }
    enviarSMSTwilio(destino, mensaje) {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = require('twilio')(accountSid, authToken);
        client.messages
            .create({
            body: mensaje,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: '+57' + destino,
        })
            .then((message) => console.log(message.sid));
    }
};
NotificacionService = tslib_1.__decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.UsuarioRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UsuarioRepository])
], NotificacionService);
exports.NotificacionService = NotificacionService;
//# sourceMappingURL=notificacion.service.js.map
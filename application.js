"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const boot_1 = require("@loopback/boot");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const rest_explorer_1 = require("@loopback/rest-explorer");
const service_proxy_1 = require("@loopback/service-proxy");
const path_1 = tslib_1.__importDefault(require("path"));
const sequence_1 = require("./sequence");
const administrador_strategy_1 = require("./strategies/administrador.strategy");
const asesor_strategy_1 = require("./strategies/asesor.strategy");
const usuario_strategy_1 = require("./strategies/usuario.strategy");
class App extends (0, boot_1.BootMixin)((0, service_proxy_1.ServiceMixin)((0, repository_1.RepositoryMixin)(rest_1.RestApplication))) {
    constructor(options = {}) {
        super(options);
        // Set up the custom sequence
        this.sequence(sequence_1.MySequence);
        // Set up default home page
        this.static('/', path_1.default.join(__dirname, '../public'));
        // Customize @loopback/rest-explorer configuration here
        this.configure(rest_explorer_1.RestExplorerBindings.COMPONENT).to({
            path: '/explorer',
        });
        this.component(rest_explorer_1.RestExplorerComponent);
        this.projectRoot = __dirname;
        // Customize @loopback/boot Booter Conventions here
        this.bootOptions = {
            controllers: {
                // Customize ControllerBooter Conventions here
                dirs: ['controllers'],
                extensions: ['.controller.js'],
                nested: true,
            },
        };
        (0, authentication_1.registerAuthenticationStrategy)(this, administrador_strategy_1.EstrategiaAdministrador);
        (0, authentication_1.registerAuthenticationStrategy)(this, asesor_strategy_1.EstratgiaAsesor);
        (0, authentication_1.registerAuthenticationStrategy)(this, usuario_strategy_1.EstrategiaUsuario);
        this.component(authentication_1.AuthenticationComponent);
    }
}
exports.App = App;
//# sourceMappingURL=application.js.map
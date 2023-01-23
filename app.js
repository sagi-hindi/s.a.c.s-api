"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Read .env file into process.env
var express_1 = __importDefault(require("express"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var cors_1 = __importDefault(require("cors"));
var config_1 = __importDefault(require("./01-utils/config"));
var errors_handler_1 = __importDefault(require("./02-middleware/errors-handler"));
var error_model_1 = __importDefault(require("./03-models/error-model"));
var dal_1 = __importDefault(require("./04-dal/dal"));
var auth_controller_1 = __importDefault(require("./06-controllers/auth-controller"));
var products_controller_1 = __importDefault(require("./06-controllers/products-controller"));
var cart_controller_1 = __importDefault(require("./06-controllers/cart-controller"));
var orders_controller_1 = __importDefault(require("./06-controllers/orders-controller"));
var path_1 = __importDefault(require("path"));
dal_1.default.connect();
var server = (0, express_1.default)();
if (config_1.default.isDevelopment)
    server.use((0, cors_1.default)());
server.use(express_1.default.json());
server.use((0, express_fileupload_1.default)());
server.use("/api/auth", auth_controller_1.default);
server.use("/api", products_controller_1.default);
server.use("/api", cart_controller_1.default);
server.use("/api", orders_controller_1.default);
var frontendDir = path_1.default.join(__dirname, 'frontend');
server.use(express_1.default.static(frontendDir));
server.use("*", function (request, response, next) {
    if (config_1.default.isDevelopment) {
        next(new error_model_1.default(404, "Route not found."));
    }
    else {
        var indexHtmlFile = path_1.default.join(__dirname, "frontend", "index.html");
        response.sendFile(indexHtmlFile);
    }
});
server.use(errors_handler_1.default);
server.listen(process.env.PORT, function () { return console.log("Listening..."); });

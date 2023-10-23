"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./database/db");
const user_route_1 = __importDefault(require("./routes/user.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const role_route_1 = __importDefault(require("./routes/role.route"));
const client_route_1 = __importDefault(require("./routes/client.route"));
const provider_route_1 = __importDefault(require("./routes/provider.route"));
const seed_route_1 = __importDefault(require("./routes/seed.route"));
const service_route_1 = __importDefault(require("./routes/service.route"));
const service_type_route_1 = __importDefault(require("./routes/service-type.route"));
const chat_route_1 = __importDefault(require("./routes/chat.route"));
const service_receipt_route_1 = __importDefault(require("./routes/service-receipt.route"));
const request_attachment_route_1 = __importDefault(require("./routes/request-attachment.route"));
dotenv_1.default.config();
const corsOptions = {
    origin: process.env.FRONTEND_URL,
};
const app = (0, express_1.default)();
//Base de datos
(0, db_1.dbConnected)();
//Middlewares
// app.use(cors(process.env.NODE_ENV !== 'development' ? corsOptions : {}));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// app.use(
// 	fileUpload({
// 		useTempFiles: true,
// 		tempFileDir: '/tmp/',
// 		createParentPath: true,
// 	})
// );
//Rutas
app.use('/api/user', user_route_1.default);
app.use('/api/auth', auth_route_1.default);
app.use('/api/rol', role_route_1.default);
app.use('/api/client', client_route_1.default);
app.use('/api/provider', provider_route_1.default);
app.use('/api/seed', seed_route_1.default);
app.use('/api/service', service_route_1.default);
app.use('/api/service-type', service_type_route_1.default);
app.use('/api/service-receipt', service_receipt_route_1.default);
app.use('/api/chatbot', chat_route_1.default);
app.use('/api/request-attachment', request_attachment_route_1.default);
//Servidor
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

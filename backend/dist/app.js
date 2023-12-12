"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db/db"));
const index_1 = __importDefault(require("./routes/index"));
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/', index_1.default);
app.get('/', (_req, res) => {
    res.send('Hello, This is inform you that backend of device gateway app is up and running!');
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
//export default app;

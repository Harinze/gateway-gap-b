"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db/db"));
const index_1 = __importDefault(require("./routes/index"));
const index_2 = __importDefault(require("./routes/index"));
const index_3 = __importDefault(require("./routes/index"));
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/', index_1.default);
app.use('/', index_2.default);
app.use("/", index_3.default);
app.get('/', (_req, res) => {
    res.send('Hello, This is the getway tracking backend!');
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
exports.default = app;

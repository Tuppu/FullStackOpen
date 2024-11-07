"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("./src/routes/api"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = 3001;
app.get('/ping', (_req, res) => {
    console.log('someone pinged here');
    res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.json('{"content": "Pong!"}');
});
app.use('/api', api_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
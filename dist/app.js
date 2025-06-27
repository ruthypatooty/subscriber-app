"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const subRoutes_1 = __importDefault(require("./routes/subRoutes"));
const database_1 = require("./config/database");
const approverOneRoute_1 = __importDefault(require("./routes/approverOneRoute"));
const approverTwoRoute_1 = __importDefault(require("./routes/approverTwoRoute"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use((0, cors_1.default)());
app.use((0, body_parser_1.json)());
app.get('/', (req, res) => {
    res.send("hiiii get api here");
});
app.use('/api/subscribers', subRoutes_1.default);
app.use('/api/firstlevelapprover', approverOneRoute_1.default);
app.use('/api/secondlevelapprover', approverTwoRoute_1.default);
async function startServer() {
    await (0, database_1.initDatabase)();
    console.log("init database saksesfuly");
    await database_1.sqlInstance.sync({ alter: true });
    console.log("db synced sakesfuly");
    app.listen(port, () => {
        console.log(`Server running on ${port}`);
    });
}
startServer();

import express from "express";
import cors from "cors";
import bodyParser from 'body-parser';
import subRoutes from "./routes/subRoutes.js";
import { initDatabase, sqlInstance } from "./config/database.js";
import { start } from "repl";
import level1router from "./routes/approverOneRoute.js";
import level2router from "./routes/approverTwoRoute.js";
import activeRouter from "./routes/activeSubRoutes.js";
import loginRouter from "./routes/loginRoute.js";
import { create } from "domain";
import createUserRoute from "./routes/createUserRoute.js";

const app = express();
const port = process.env.PORT || 3001;
const { json, urlencoded } = bodyParser;
app.use(cors());
app.use(json());

app.get('/',(req,res)=>{
    res.send("hiiii get api here");
});

app.use('/api/subscribers', subRoutes);
app.use('/api/firstlevelapprover',level1router);
app.use('/api/secondlevelapprover',level2router);
app.use('/api', (req,res,next)=>{
    console.log('API route for active router');
    next();
},activeRouter);
app.use('/api/loginpage', loginRouter);
app.use('/api/createuser', createUserRoute);

async function startServer(){
    await initDatabase();
    console.log("init database saksesfuly");

    await sqlInstance.sync({alter:true});
    console.log("db synced sakesfuly")

    app.listen(port,()=>{
        console.log(`Server running on ${port}`);
    })
}

startServer();
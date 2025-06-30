import express from "express";
import cors from "cors";
import { json } from "body-parser";
import subRoutes from "./routes/subRoutes";
import { initDatabase, sqlInstance } from "./config/database";
import { start } from "repl";
import level1router from "./routes/approverOneRoute";
import level2router from "./routes/approverTwoRoute";
import activeRouter from "./routes/activeSubRoutes";

const app = express();
const port = process.env.PORT || 3001;

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
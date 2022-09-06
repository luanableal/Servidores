import express from "express";
import dotenv from "dotenv";
import router from "./routers/router.js"
import cors from "cors"
dotenv.config();
const PORT = process.env.PORT || 8081;

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));




app.listen(8081, ()=>{
    console.log("Servidor funcionando")
})
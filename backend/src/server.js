import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './CONFIG/db.js'
import userroutes from './routes/userroutes.js'
import path from 'path'
import { fileURLToPath } from 'url'; // ⬅️ NEW
import { dirname } from 'path';    // ⬅️ NEW

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config()
const PORT=process.env.PORT
const app=express();
app.use(cors());
app.use(express.json())
connectDB();


app.use("/user",userroutes)


app.get("/ping", (req,res) => res.send("pong"));

const parentDir = path.join(__dirname, '..', '..', 'frontend', 'login');

app.use(express.static(path.join(parentDir, "build")));

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(parentDir, "build", "index.html"));
});




app.listen(PORT,()=>{
    console.log(`app listening to port:${PORT}`)
})
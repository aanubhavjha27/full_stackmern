import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './CONFIG/db.js'
import userroutes from './routes/userroutes.js'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

dotenv.config()
const app = express()
const PORT = process.env.PORT

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(cors());
app.use(express.json());
connectDB();

// 🔹 API routes
app.use("/user", userroutes);
app.get("/ping", (req,res) => res.send("pong"));

// 🔹 React served AFTER APIs
const frontendPath = path.join(__dirname, "..", "..", "frontend", "login", "build");
app.use(express.static(frontendPath));
app.use((req, res) => res.sendFile(path.join(frontendPath, "index.html")));


app.listen(PORT, () => console.log(`app listening on port: ${PORT}`))

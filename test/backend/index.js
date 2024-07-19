import express from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
dotenv.config()
import path from 'path'

const app = express();

app.use(cors())
app.use(cookieParser())
app.use(express.json());

// deploy 

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

    const __dirname = path.resolve()

    if (process.env.NODE_ENV === "production") {
        app.use(express.static(path.join(__dirname, "/frontend/dist")));
    
        app.get("*", (req, res) => {
            res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
        });
    }
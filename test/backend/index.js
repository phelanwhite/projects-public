import express from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";
import path from 'path'

const app = express();

app.use(cors())
app.use(cookieParser())
app.use(express.json());

// deploy 

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

    const __dirname = path.resolve()

    app.use(express.static(path.join(__dirname, 'frontend/dist')));

    // API routes...
    app.get(`/api`,async (req, res) => {
        return res.status(200).json(`api routes`)
    })
    


    app.get('*', (req, res) => {
        return res.sendFile(path.join(process.cwd(), 'frontend/dist/index.html'));
    });

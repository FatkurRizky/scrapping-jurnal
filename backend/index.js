import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config()
const app = express()
const PORT = 5000



app.use(cors());

app.get('/', (req, res) => {
    res.json({ message: `server scapper sedang berjalan` })
})


app.get('/api/search', async (req, res) => {
    let q = req.query.q
    const c = req.query.checkBoxSinta
    const start = req.query.start||0

    if (!q) {
        return res.status(400).json({ error: "Keyword harus diisi" })
    }

    if(c === "true"){
        q = q + " sinta"
    }


    try {
        const result = await axios.get('https://serpapi.com/search.json', {
            params: {
                engine: "google_scholar",
                q:q,
                hl: 'id',
                start:start,
                api_key: process.env.SERPAPI_KEY,
            }
        })

        res.json(result.data.organic_results)
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.listen(PORT, () => {
    console.log(`server jalan di http://localhost:${PORT}`)
})

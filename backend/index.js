import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config()
const app = express()
const PORT = 5000
const cache = {}



app.use(cors());

app.get('/', (req, res) => {
    res.json({ message: `server scapper sedang berjalan` })
})


app.get('/api/search', async (req, res) => {
    let q = req.query.q
    const c = req.query.checkBoxSinta
    const start = parseInt(req.query.start)||0
    const cacheKey = `${q}_${start}_${c}`

    if (!q) {
        return res.status(400).json({ error: "Keyword harus diisi" })
    }

    if(cache[cacheKey]){
        return res.json(cache[cacheKey])
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

        if(result.data.error){
            return res.status(502).json({error: result.data.error})
        }

        const data = result.data.organic_results || []
        cache[cacheKey] = data
        res.json(data)
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.listen(PORT, () => {
    console.log(`server jalan di http://localhost:${PORT}`)
})

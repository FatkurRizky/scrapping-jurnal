# 🔍 Scholar Search — Web Scraper Jurnal Akademik

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

Tool pencarian jurnal dan paper akademik dari Google Scholar. Dibuat untuk membantu mahasiswa menemukan referensi skripsi dengan cepat — lengkap dengan filter open access, sorting sitasi, dan caching untuk hemat kuota API.

## ✨ Fitur

| Fitur | Deskripsi |
|-------|-----------|
| 🔎 **Pencarian Jurnal** | Cari paper dari Google Scholar via SerpApi |
| 📄 **Pagination** | Navigasi halaman hasil (10 hasil per page) |
| 📊 **Sort by Sitasi** | Urutkan hasil berdasarkan sitasi tertinggi/terendah |
| 🆓 **Filter Open Access** | Tampilkan hanya paper yang punya link PDF gratis |
| 🇮🇩 **SINTA Checkbox** | Tambahkan keyword "sinta" untuk fokus riset Indonesia |
| ⚡ **Backend Cache** | Hasil search disimpan di memory — keyword sama tidak mengulang hit ke SerpApi |
| 💀 **Skeleton Loading** | Placeholder UI saat data dimuat |
| 📱 **Responsive Design** | Mobile-first dengan Tailwind CSS |

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 · Vite · Tailwind CSS v4 · Axios |
| Backend | Express.js 5 · Axios · dotenv · CORS |
| Data Source | [SerpApi — Google Scholar API](https://serpapi.com/google-scholar-api) |

## 🚀 Cara Menjalankan

### Prasyarat

- Node.js >= 18
- API key SerpApi ([daftar gratis di sini](https://serpapi.com/manage-api-key)) — free tier 100 search/bulan

### Instalasi

```bash
# 1. Clone repository
git clone https://github.com/username/web-scrapper.git
cd web-scrapper

# 2. Install dependencies backend
cd backend
npm install

# 3. Install dependencies frontend
cd ../frontend
npm install
```

### Konfigurasi Environment

Buat file `.env` di folder `backend/` (bisa copy dari `.env.example`):

```env
SERPAPI_KEY=your_serpapi_api_key_here
```

> ⚠️ Jangan pernah commit file `.env` ke repository.

### Menjalankan Aplikasi

```bash
# Terminal 1 — Backend (berjalan di port 5000)
cd backend
node index.js

# Terminal 2 — Frontend (berjalan di port 5173)
cd frontend
npm run dev
```

Buka browser: `http://localhost:5173`

## 📡 API Documentation

### `GET /`

Health check server.

```json
{ "message": "server scraper sedang berjalan" }
```

### `GET /api/search`

Mencari jurnal di Google Scholar.

| Query Param | Type | Required | Keterangan |
|-------------|------|----------|------------|
| `q` | string | ✅ | Keyword pencarian |
| `start` | number | ❌ | Offset hasil (default `0`, kelipatan 10 per page) |
| `checkBoxSinta` | boolean | ❌ | `"true"` = tambahkan keyword "sinta" |

**Contoh Request:**

```bash
curl "http://localhost:5000/api/search?q=machine+learning&start=10&checkBoxSinta=false"
```

**Contoh Response (`200 OK`):**

```json
[
  {
    "title": "Machine Learning for Cybersecurity: A Systematic Review",
    "snippet": "This paper reviews the application of machine learning...",
    "publication_info": { "summary": "Journal of Computer Security, 2025 — Smith, J." },
    "link": "https://example.com/paper",
    "resources": [{ "link": "https://example.com/paper.pdf" }],
    "inline_links": { "cited_by": { "total": 142 } },
    "result_id": "unique_paper_id"
  }
]
```

**Error Responses:**

| Status | Penyebab |
|--------|----------|
| `400` | Parameter `q` kosong |
| `502` | Error dari SerpApi (API key invalid / rate limit) |
| `500` | Server error internal |

## 📁 Struktur Project

```
web-scrapper/
├── backend/
│   ├── index.js           # Express server + routing + cache
│   ├── .env               # API key (tidak di-commit)
│   ├── .env.example       # Template environment variables
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx        # Main app: search, sort, filter, pagination
│   │   ├── main.jsx       # React entry point
│   │   └── index.css      # Tailwind CSS import
│   ├── index.html
│   └── package.json
└── README.md
```

## 🗺️ Roadmap

- [x] Pencarian Google Scholar via SerpApi
- [x] Pagination dengan offset calculation `(page - 1) * 10`
- [x] Sorting berdasarkan jumlah sitasi
- [x] Filter open access (deteksi PDF link)
- [x] In-memory cache backend
- [ ] AI Summarizer — rangkum abstrak jadi bullet points
- [ ] AI Keyword Extractor — auto-tag metode penelitian
- [ ] Chatbot "Tanya Paper" — Q&A berdasarkan abstrak
- [ ] Integrasi Unpaywall / CORE API untuk cek open access lebih akurat
- [ ] Scraping Garuda Kemdikbud & SINTA langsung (Puppeteer)

## 🤝 Contributing

Project ini open source dan terbuka untuk kontribusi:

1. Fork repository ini
2. Buat branch fitur (`git checkout -b feature/nama-fitur`)
3. Commit perubahan (`git commit -m "feat: deskripsi fitur"`)
4. Push ke branch (`git push origin feature/nama-fitur`)
5. Buka Pull Request

## 📄 License

MIT License — bebas digunakan untuk keperluan edukasi.

## 👨‍💻 Author

**Fatkur** — Mahasiswa Teknik Informatika

⭐ Beri star jika project ini bermanfaat!

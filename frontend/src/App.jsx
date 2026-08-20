import { useState } from "react";
import axios from "axios";

const DATA_DUMMY = [
  {
    title: "Machine Learning for Cybersecurity: A Systematic Review",
    snippet:
      "This paper reviews the application of machine learning techniques in cybersecurity, covering intrusion detection, malware classification, and anomaly detection across enterprise networks.",
    publication_info: { summary: "Journal of Computer Security, 2025 — Smith, J., Lee, K." },
    link: "https://example.com",
    inline_links: { cited_by: { total: 142 } },
    result_id: "101",
  },
  {
    title: "Klasifikasi Malware Menggunakan Convolutional Neural Network",
    snippet:
      "Penelitian ini mengusulkan pendekatan CNN untuk klasifikasi malware berdasarkan visualisasi binary. Akurasi mencapai 97.3% pada dataset benchmark.",
    publication_info: { summary: "Jurnal Informatika, Maret 2026 — Budi, A., Sari, R." },
    link: "https://example.com",
    inline_links: { cited_by: { total: 28 } },
    result_id: "102",
  },
  {
    title: "SQL Injection Detection Using Deep Learning Approaches",
    snippet:
      "A comparative study of LSTM, GRU, and Transformer-based models for detecting SQL injection attacks in web applications with real-world traffic data.",
    publication_info: { summary: "IEEE Access, 2025 — Wang, X., Chen, Y." },
    link: "https://example.com",
    inline_links: { cited_by: { total: 65 } },
    result_id: "103",
  },
];

export default function App() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(DATA_DUMMY);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    setError("");
    const URL = "http://localhost:5000/api/search";
    try {
      const response = await axios.get(URL, { params: { q: input } });
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-center mb-2">Scholar Search</h1>
        <p className="text-slate-400 text-center mb-8">Cari jurnal dan paper akademik dari Google Scholar</p>

        <div className="flex max-w-2xl mx-auto gap-3 mb-10">
          <input
            type="text"
            placeholder="Ketik topik penelitian..."
            value={input}
            onChange={handleInput}
            className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
          />
          <button
            onClick={handleSearch}
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-medium px-6 py-3 rounded-lg transition cursor-pointer disabled:cursor-not-allowed"
          >
            {isLoading ? "Mencari..." : "Cari"}
          </button>
        </div>

        {error && (
          <div className="bg-rose-900/30 border border-rose-700 text-rose-300 px-4 py-3 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {isLoading ? (
            <p className="animate-pulse bg-slate-500 text-center py-12">Mencari jurnal ...</p>
          ):
            data === null ? (
              <p className="text-slate-500 text-center py-12">Mulai cari jurnal</p>
            ) : data.length === 0 ? (<p className="text-slate-500 text-center py-12">Tidak ada hasil untuk {input}</p>) : (
              data.map((jurnal) => (
                <div
                  key={jurnal.result_id}
                  className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-left hover:border-slate-500 transition"
                >
                  <h2 className="text-lg font-semibold text-blue-400">{jurnal.title}</h2>
                  <p className="text-sm text-slate-400 mt-1">{jurnal.publication_info?.summary}</p>
                  <p className="text-slate-300 mt-3 leading-relaxed">{jurnal.snippet}</p>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-700">
                    <a
                      href={jurnal.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 text-sm font-medium transition"
                    >
                      Baca Paper →
                    </a>
                    <span className="bg-slate-700 text-slate-300 text-xs font-medium px-3 py-1 rounded-full">
                      Dikutip: {jurnal.inline_links?.cited_by?.total || 0}
                    </span>
                  </div>
                </div>
              ))
            )
          }
        </div>
      </div>
    </div>
  );
}

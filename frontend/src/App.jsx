import { useState } from "react";
import axios from "axios";


export default function App() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('')
  const [data, setData] = useState(null);



  const handleInput = (e) => {
    setInput(e.target.value)
  }

  const handleSearch = async () => {
    setIsLoading(true);
    const URL = 'http://localhost:5000/api/search'
    try {
      const response = await axios.get(URL, { params: { q: input } })
      setData(response.data)

      console.log(response.data)
    }
    catch (err) {
      setError(err.message)
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <input type="text" value={input} onChange={handleInput} />
      <button onClick={handleSearch}>Cari</button>
        {data && data.map((jurnal) => (
          <div key={jurnal.result_id}>
          <h2> {jurnal.title}</h2>
          <h3>{jurnal.publication_info?.summary}</h3>
          <p>{jurnal.snippet}</p>
          <a href={jurnal.link} target="_blank" rel="noopener noreferrer">Baca Paper</a>
          <p>{jurnal.inline_links?.cited_by?.total || 0}</p>

          </div>
        ))}
      {error && <p className="text-rose-500">{error}</p>}
    </div>
  )
}
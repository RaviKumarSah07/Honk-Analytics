import { useState, useEffect } from "react";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// Reusable fetcher — returns { data, loading, error }
const useFetch = (endpoint) => {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}${endpoint}?city=Ahmedabad`);
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};

export default useFetch;

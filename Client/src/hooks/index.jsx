import { useCallback, useEffect, useState } from "react";
import { getToken } from "../config";

export const useFetchWebAPI = (endpoint, method, body) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const fetchRequest = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method,
      body: JSON.stringify(body),
    });
    if (res.status === 401) {
      const response = await res.json();
      if (response.error.status === 401) {
        await getToken();
        await fetchRequest();
      } else setError(await res.json());
    }
    setData(await res.json());
    setLoading(false);
  }, [body, endpoint, method]);

  useEffect(() => {
    fetchRequest();
  }, [fetchRequest]);

  return { data, loading, error };
};

export const useLazyFetchWebAPI = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const fetchRequest = useCallback(async (endpoint, method, body) => {
    setLoading(true);
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method,
      body: JSON.stringify(body),
    });
    if (!res.status === 200) {
      const response = await res.json();
      if (response.error.status === 401) {
        console.log("entered");
        await getToken();
        await fetchRequest();
      } else setError(await res.json());
    }
    setData(await res.json());
    setLoading(false);
  }, []);

  return [fetchRequest, { data, loading, error }];
};
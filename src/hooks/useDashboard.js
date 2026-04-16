import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export function useDashboard(slug) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboard = useCallback(() => {
    if (!slug) return;
    setLoading(true);
    axios
      .get(`${API_BASE}/projects/${slug}/dashboard/`)
      .then((res) => {
        setData(res.data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const refresh = useCallback(async () => {
    if (!slug) return;
    setRefreshing(true);
    try {
      await axios.post(`${API_BASE}/projects/${slug}/refresh/`);
      // Reload dashboard data after refresh
      await axios
        .get(`${API_BASE}/projects/${slug}/dashboard/`)
        .then((res) => {
          setData(res.data);
          setError(null);
        });
    } catch (err) {
      setError(`Error al actualizar: ${err.message}`);
    } finally {
      setRefreshing(false);
    }
  }, [slug]);

  return { data, loading, error, refresh, refreshing };
}

export function useFocusATC(slug) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    axios
      .get(`${API_BASE}/projects/${slug}/focus/atc/`)
      .then((res) => setData(res.data))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [slug]);

  return { data, loading };
}

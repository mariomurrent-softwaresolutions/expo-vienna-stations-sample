import {useEffect, useState, useCallback, useMemo} from "react";
import * as SecureStore from "expo-secure-store";
import {StorageKey} from "@/constants/storage-key";

export function useSecureStorage<T = unknown>(key: StorageKey) {
  const [value, setValue] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const item = await SecureStore.getItemAsync(key);
        setValue(item ? JSON.parse(item) : null);
      } catch (e) {
        console.error(e);
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    })();

  }, [key]);

  const save = useCallback(async (next: T | null) => {
      try {
        setLoading(true);
        setValue(next);
        await SecureStore.setItemAsync(key, JSON.stringify(next));
      } catch (e) {
        console.error(e);
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    },
    [key]
  );

  return useMemo(() => ({
    value,
    setValue: save,
    loading,
    error,
  }), [value, loading, error, setValue]);
}

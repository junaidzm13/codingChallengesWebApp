import { useEffect, useState } from 'react';
import { fetchResponse } from './fetchApi';
import { JApiTypeByName, Data } from './JApiTypeByName';

type Response<T extends keyof JApiTypeByName> = {
  data: Data<T>;
  loading: boolean;
  error: string | undefined;
};

export function useJApi<T extends keyof JApiTypeByName>(
  name: T,
  input: JApiTypeByName[T]['input']
): Response<T> {
  const [data, setData] = useState<Data<T>>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fn = async () => {
      setLoading(true);
      try {
        const response = await fetchResponse(name, input);
        setData(response);
      } catch {
        setError('error');
      }
      setLoading(false);
    };
    fn();
  }, [name, input]);

  return {
    data,
    loading,
    error,
  };
}

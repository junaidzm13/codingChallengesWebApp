import { useEffect, useState, useCallback } from 'react';
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
  const { resolver } = useJApiClient();

  useEffect(() => {
    const fn = async () => {
      setLoading(true);

      const response = await resolver(name, input);
      if (response.data) setData(response.data);
      else setError(response.error);

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

export function useJApiClient() {
  const resolver = useCallback(
    async <T extends keyof JApiTypeByName>(
      name: T,
      input: JApiTypeByName[T]['input']
    ): Promise<{ data: Data<T>; error: string | undefined }> => {
      try {
        const response = await fetchResponse(name, input);
        return { data: response, error: undefined };
      } catch (e) {
        return { data: undefined, error: 'Error' };
      }
    },
    []
  );

  return { resolver };
}

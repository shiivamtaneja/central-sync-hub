'use client';

import { useEffect, useRef, useState } from 'react';

const useQuery = <T, G>({
  queryFn,
  options,
  errMsg,
  status
}: {
  queryFn: string,
  options: RequestInit,
  errMsg: string,
  status: "authenticated" | "loading" | "unauthenticated"
}) => {
  const controllerRef = useRef<AbortController>();

  const [data, setData] = useState<{
    message: string,
    data: T | null,
    other: G | null
  }>({
    message: '',
    data: null,
    other: null
  });
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'loading' || status === 'unauthenticated')
      return;

    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;

    const getData = async () => {
      try {
        const response = await fetch('/api' + queryFn, {
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          ...options,
          signal
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error);
        }

        const data = await response.json();

        setData(data);
      } catch (error) {
        if (error instanceof Error) {
          if (error.message != 'The user aborted a request.') {
            setIsError(`${errMsg}: ${error.message}`);
          }
        }
        else {
          setIsError(`${errMsg}: Unknown error`);
        }
      }
    };

    getData();

    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isError,
    data
  };
};

export default useQuery;
import { useEffect, useRef, useState } from "react";
import apiPost from "lib/api/post";
import useIsMounted from "./mounted";
import { delay } from "awaiting";

interface Options {
  endpoint: string;
  params?: object;
  cache_s?: number;
}

export default function useAPI(
  endpoint?: string,
  params?: object,
  cache_s?: number
) {
  const [error, setError] = useState<string>("");
  const [result, setResult] = useState<any>(undefined);
  const [calling, setCalling] = useState<boolean>(false);
  const queue = useRef<Options[]>([]);
  const isMounted = useIsMounted();

  async function call(
    endpoint: string,
    params?: object,
    cache_s?: number
  ): Promise<any> {
    if (calling) {
      queue.current.push({ endpoint, params, cache_s });
      return;
    }
    setCalling(true);
    let result;
    try {
      result = await apiPost(endpoint, params, cache_s);
    } catch (err) {
      if (!isMounted.current) return;
      setCalling(false);
      setError(`${err}`);
      setResult({ error: err });
      queue.current = [];
      return;
    }
    if (!isMounted.current) return;
    setCalling(false);
    setResult(result);
    if (queue.current.length > 0) {
      const next = queue.current.shift();
      if (next == null) return;
      const { endpoint, params, cache_s } = next;
      if (!isMounted.current) return;
      await delay(1);
      call(endpoint, params, cache_s);
    }
  }

  useEffect(() => {
    if (endpoint) {
      call(endpoint, params, cache_s);
    }
  }, []);

  return { error, result, calling, call };
}
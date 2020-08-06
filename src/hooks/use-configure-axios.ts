import Axios from 'axios';
import { configure } from 'axios-hooks';

declare module 'axios' {
  export interface AxiosRequestConfig {
    useCache?: boolean;
  }
}

export const useConfigureAxios = (token: string) => {
  let headers: { [key: string]: string } = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const axios = Axios.create({
    headers,
    useCache: false,
  });

  configure({ axios });
};

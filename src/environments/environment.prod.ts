import { apiUrl } from './api-url.const';

const root = "http://localhost:3000";

export const environment = {
  production: true,
  apiUrl: apiUrl(root)
};

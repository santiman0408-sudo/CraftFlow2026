import { API_CONFIG } from "./api.config";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), API_CONFIG.timeoutMs);
  try {
    const response = await fetch(`${API_CONFIG.baseUrl}${path}`, {
      ...options,
      headers: { "Content-Type": "application/json", ...(options.headers ?? {}) },
      signal: controller.signal,
    });
    if (!response.ok) throw new Error((await response.text()) || `HTTP ${response.status}`);
    return (await response.json()) as T;
  } finally { clearTimeout(timeout); }
}
export const apiClient = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) => request<T>(path, { method: "POST", body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) => request<T>(path, { method: "PUT", body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};

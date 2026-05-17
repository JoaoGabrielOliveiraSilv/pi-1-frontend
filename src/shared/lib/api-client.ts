import { getToken, clearToken } from './auth';

export class ApiError extends Error {
    constructor(
        message: string,
        public readonly status: number,
        public readonly code?: string,
    ) {
        super(message)
        this.name = 'ApiError'
    }
}

export enum ApiRoute {
    Dashboard = "/api/dashboard",
    Clientes = "/api/clientes",
    Marmitas = "/api/marmitas",
    Pedidos = "/api/pedidos",
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL

async function request<T>(route: ApiRoute | string, options?: RequestInit): Promise<T> {
    const token = getToken();
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${baseUrl}${route}`, {
        headers,
        ...options,
    })

    if (res.status === 401) {
        clearToken();
        if (typeof window !== 'undefined') window.location.href = '/login';
        return undefined as T;
    }

    if (!res.ok) {
        const body = await res.json().catch(() => null)
        const message = body?.error?.message ?? `Request failed: ${res.status} ${route}`
        throw new ApiError(message, res.status, body?.error?.code)
    }

    if (res.status === 204 || res.headers.get("content-length") === "0") {
        return undefined as T
    }

    return res.json() as Promise<T>
}

export const apiClient = {
    get: <T>(route: ApiRoute, params?: Record<string, string | number>) => {
        const url = params
            ? `${route}?${new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)]))}` as unknown as ApiRoute
            : route
        return request<T>(url)
    },

    post: <T>(route: ApiRoute, body: unknown) =>
        request<T>(route, { method: "POST", body: JSON.stringify(body) }),

    getById: <T>(route: ApiRoute, id: number) =>
        request<T>(`${route}/${id}`),

    put: <T>(route: ApiRoute, id: number, body: unknown) =>
        request<T>(`${route}/${id}`, { method: "PUT", body: JSON.stringify(body) }),

    delete: (route: ApiRoute, id: number, params?: Record<string, string>) => {
        const qs = params ? `?${new URLSearchParams(params)}` : ''
        return request<void>(`${route}/${id}${qs}`, { method: "DELETE" })
    },
}

export enum ApiRoute {
    Dashboard = "/api/dashboard",
    Clientes = "/api/clientes",
    Marmitas = "/api/marmitas",
    Pedidos = "/api/pedidos",
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL

async function request<T>(route: ApiRoute | string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${baseUrl}${route}`, {
        headers: { "Content-Type": "application/json" },
        ...options,
    })

    if (!res.ok) {
        const body = await res.json().catch(() => null)
        const message = body?.error?.message ?? `Request failed: ${res.status} ${route}`
        throw new Error(message)
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

    put: <T>(route: ApiRoute, id: number, body: unknown) =>
        request<T>(`${route}/${id}`, { method: "PUT", body: JSON.stringify(body) }),

    delete: (route: ApiRoute, id: number) =>
        request<void>(`${route}/${id}`, { method: "DELETE" }),
}

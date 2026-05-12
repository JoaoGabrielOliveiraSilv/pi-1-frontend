import { LoginPayload, LoginResponse } from './types';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function login(payload: LoginPayload): Promise<LoginResponse> {
    const res = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error?.message ?? 'Credenciais inválidas.');
    }

    return res.json();
}

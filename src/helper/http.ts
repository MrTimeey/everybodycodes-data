export async function http<T = unknown>(url: string, init?: RequestInit): Promise<T> {
    const res = await fetch(url, {
        ...init,
        headers: {
            accept: "application/json",
            "user-agent": "everybodycodes-data/0.1 (+github.com/you/repo)",
            ...(init?.headers ?? {}),
        },
    });
    if (!res.ok) {
        const body = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status} ${res.statusText} :: ${url} :: ${body}`);
    }
    const ct = res.headers.get("content-type") || "";
    return (ct.includes("application/json") ? await res.json() : ((await res.text()) as any)) as T;
}

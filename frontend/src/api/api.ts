export async function protectedApi(input: RequestInfo | URL, init?: RequestInit) {
  const token = localStorage.getItem("token"); // or sessionStorage/cookies
  const url = typeof input === "string" ? input : input.toString();

  const isAuthFree = url.includes("/login") || url.includes("/register");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(init?.headers || {}),
  };

  if (token && !isAuthFree) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...init,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}
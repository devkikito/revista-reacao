"use server";

const baseURL = process.env.BASE_URL || "";

async function fetchWrapper(endpoint: string, options: RequestInit = {}): Promise<any> {
  const response = await fetch(`${baseURL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "An error occurred");
  }

  // Verifica se o conteúdo da resposta é JSON antes de tentar parsear
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  } else {
    throw new Error("Response is not JSON");
  }
}

export default fetchWrapper;

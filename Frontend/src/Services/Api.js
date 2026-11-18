
const API_BASE_URL = "http://localhost:3000/api";

export async function apiRequest(path, options = {}) {
  const isFormData = options.body instanceof FormData;

  const headers = {
    ...options.headers,
  };

  if (options.body && !isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    credentials: "include",
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(
      data.message || "Something went wrong. Please try again."
    );

    error.status = response.status;
    error.code = data.code;
    error.errors = data.errors;

    throw error;
  }

  return data;
}

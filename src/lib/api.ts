const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

interface ApiRequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown
  token?: string | null
}

interface ApiEnvelope<T> {
  success: boolean
  data?: T
  message?: string
}

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const { body, token, headers, ...rest } = options

  let res: Response
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      ...rest,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new ApiError('Could not reach the server. Please try again.', 0)
  }

  let payload: ApiEnvelope<T> | null = null
  try {
    payload = await res.json()
  } catch {
    // no/invalid JSON body
  }

  if (!res.ok || !payload?.success) {
    throw new ApiError(payload?.message || `Request failed (${res.status})`, res.status)
  }

  return payload.data as T
}

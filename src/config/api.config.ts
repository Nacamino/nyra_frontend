export const apiConfig = {
  baseUrl:
    import.meta.env.VITE_API_BASE_URL ??
    "http://127.0.0.1:8000",

  endpoints: {
    chat: "/api/v1/chat",
    health: "/health",
    actions: {
    confirm: "/api/v1/actions/confirm",
    cancel: "/api/v1/actions/cancel",
  },
  },

 
} as const;
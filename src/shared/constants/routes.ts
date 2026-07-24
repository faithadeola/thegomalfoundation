export const ROUTES = {
  HOME: "/",
  GIVE: "/give",
  TRIBUTES: "/tributes",
  PARTNERSHIP: "/partnership",
  FOUNDATION: "/foundation",
  ADMIN: "/admin",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];

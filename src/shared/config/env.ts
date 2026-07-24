function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

function optionalEnv(key: string, fallback = ""): string {
  return process.env[key] ?? fallback;
}

export const ENV = {
  RESEND_API_KEY: requireEnv("RESEND_API_KEY"),
  FOUNDATION_EMAIL: optionalEnv(
    "FOUNDATION_EMAIL",
    "foundation@lasehinde.org"
  ),
  APP_URL: optionalEnv("NEXT_PUBLIC_APP_URL", "http://localhost:3000"),
} as const;

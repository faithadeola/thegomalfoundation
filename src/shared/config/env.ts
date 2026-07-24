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
  get RESEND_API_KEY() { return requireEnv("RESEND_API_KEY"); },
  get FOUNDATION_EMAIL() { return optionalEnv("FOUNDATION_EMAIL", "foundation@lasehinde.org"); },
  get APP_URL() { return optionalEnv("NEXT_PUBLIC_APP_URL", "http://localhost:3000"); },
};

export const env = {
  baseURL: process.env.BASE_URL ?? 'https://testautomationpractice.blogspot.com',
  defaultTimeoutMs: Number(process.env.TIMEOUT_MS ?? 30_000),
} as const;

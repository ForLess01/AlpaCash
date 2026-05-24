"use client";

export function getAuthCallbackUrl() {
  const configuredAppUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();

  if (configuredAppUrl) {
    return `${configuredAppUrl.replace(/\/+$/, "")}/auth/callback`;
  }

  if (typeof window !== "undefined" && window.location.origin) {
    return `${window.location.origin}/auth/callback`;
  }

  return undefined;
}

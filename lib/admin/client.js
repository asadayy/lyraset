'use client';

/**
 * Thin client-side wrappers around the admin JSON API. Every call returns the
 * parsed body ({ ok, ... }); callers surface errors via toasts.
 */

async function req(url, options) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  let data = {};
  try {
    data = await res.json();
  } catch {
    // non-JSON (e.g. CSV) — ignore
  }
  return { status: res.status, ...data };
}

export const apiList = (resource) => req(`/api/${resource}`);
export const apiGet = (resource, id) => req(`/api/${resource}/${id}`);
export const apiCreate = (resource, body) =>
  req(`/api/${resource}`, { method: 'POST', body: JSON.stringify(body) });
export const apiUpdate = (resource, id, body) =>
  req(`/api/${resource}/${id}`, { method: 'PUT', body: JSON.stringify(body) });
export const apiRemove = (resource, id) => req(`/api/${resource}/${id}`, { method: 'DELETE' });

/** Singleton (settings / seo): GET + PUT on the base resource. */
export const apiGetSingleton = (resource) => req(`/api/${resource}`);
export const apiPutSingleton = (resource, body) =>
  req(`/api/${resource}`, { method: 'PUT', body: JSON.stringify(body) });

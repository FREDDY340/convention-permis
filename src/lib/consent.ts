// Consentement aux contenus tiers (carte Google Maps). Aucun cookie d'audience ni publicitaire sur le site.
// Le choix est mémorisé dans le stockage local du navigateur pendant 12 mois.
const KEY = 'cp-consent-maps';
const MAX_AGE_MS = 365 * 24 * 3600 * 1000;
export const CONSENT_EVENT = 'cp-consent-change';

export function getMapsConsent(): boolean {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return false;
    const { value, ts } = JSON.parse(raw);
    if (Date.now() - ts > MAX_AGE_MS) { localStorage.removeItem(KEY); return false; }
    return value === true;
  } catch { return false; }
}

export function setMapsConsent(value: boolean) {
  try { localStorage.setItem(KEY, JSON.stringify({ value, ts: Date.now() })); } catch { /* stockage indisponible */ }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: { maps: value } }));
}

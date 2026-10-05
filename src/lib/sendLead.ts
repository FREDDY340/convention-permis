import { CONTACT_EMAIL } from '../data/tarifs';

// Envoi des demandes de contact par e-mail via FormSubmit (fonctionne sur GitHub Pages comme sur Netlify).
// Au tout premier envoi, FormSubmit adresse un e-mail d'activation à CONTACT_EMAIL : il faut cliquer le lien une fois.
const ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

export type LeadFields = Record<string, string | boolean>;

export async function sendLead(fields: LeadFields, subject: string): Promise<void> {
  const payload: Record<string, string> = {
    _subject: subject,
    _template: 'table',
    _captcha: 'false',
  };
  for (const [key, value] of Object.entries(fields)) {
    payload[key] = typeof value === 'boolean' ? (value ? 'Oui' : 'Non') : value;
  }
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Envoi impossible (${res.status})`);
  const data = await res.json().catch(() => ({}));
  if (data.success === false || data.success === 'false') throw new Error(data.message || 'Envoi impossible');
}

// Envoi des demandes de contact par e-mail, directement depuis l'hébergement LWS de Freddy Motion (point d'envoi PHP
// api/convention-permis/envoyer.php), vers contact@conventionpermis.fr. Réponse en moins d'une seconde.
// Remplace FormSubmit (25/11/2026) : 59 s d'attente et formulaire jamais activé, rien ne partait.
const ENDPOINT = 'https://www.freddymotion.com/api/convention-permis/envoyer.php';
const DELAI_MS = 20000;

export type LeadFields = Record<string, string | boolean>;
/** Formulaire d'origine : le serveur en déduit l'objet du mail (jamais fourni par le visiteur). */
export type LeadForm = 'contact' | 'evaluation';

/** Erreur d'envoi. `message` est le texte du serveur à montrer au visiteur, vide pour une coupure réseau. */
export class LeadError extends Error {}

export async function sendLead(formulaire: LeadForm, fields: LeadFields, siteWeb = ''): Promise<void> {
  const champs: Record<string, string> = {};
  for (const [key, value] of Object.entries(fields)) {
    champs[key] = typeof value === 'boolean' ? (value ? 'Oui' : 'Non') : value;
  }
  const ctrl = new AbortController();
  const minuteur = setTimeout(() => ctrl.abort(), DELAI_MS);
  let res: Response;
  try {
    res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ formulaire, champs, site_web: siteWeb }),
      signal: ctrl.signal,
    });
  } catch {
    throw new LeadError(''); // coupure réseau ou délai dépassé : message générique dans le formulaire
  } finally {
    clearTimeout(minuteur);
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.success !== true) throw new LeadError(typeof data.message === 'string' ? data.message : '');
}

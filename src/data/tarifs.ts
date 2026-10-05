// Grille tarifaire officielle (affiche tarifs du 2 octobre 2026, complétée par Convention Permis le 3 octobre).
// Source unique : cartes formation, fiches détaillées et bandeau étudiant lisent ces valeurs.

export const STUDENT_DISCOUNT = 200;
export const ACCELERATED_PACK = 650;
export const STUDENT_PROOF_NOTE = "sur présentation d'un justificatif étudiant";

export interface Forfait {
  label: string;
  price: number;
  /** Prix étudiant affiché, null quand la remise n'est pas encore confirmée pour ce forfait. */
  studentPrice: number | null;
}

export const FORFAITS: Record<string, Forfait[]> = {
  'permis-b-meca': [
    { label: '20 h de conduite', price: 1290, studentPrice: 1090 },
    { label: '30 h de conduite', price: 1690, studentPrice: 1490 },
  ],
  'permis-b-auto': [
    { label: '13 h de conduite', price: 1090, studentPrice: 890 },
    { label: '20 h de conduite', price: 1390, studentPrice: 1190 },
    { label: '30 h de conduite', price: 1790, studentPrice: 1590 },
  ],
  // Prix non présent sur la grille du 2 octobre : à confirmer par Convention Permis.
  'conduite-accompagnee': [
    { label: 'Formation initiale 20 h', price: 1150, studentPrice: null },
  ],
  'moto-a2': [
    { label: 'Formation complète 20 h', price: 790, studentPrice: null },
  ],
};

export const formatEuros = (value: number) =>
  `${value.toLocaleString('fr-FR').replace(/ /g, ' ')} €`;

export const lowestPrice = (formationId: string) =>
  Math.min(...(FORFAITS[formationId] ?? []).map((f) => f.price));

export const WHATSAPP_NUMBER = '33699774576';
export const WHATSAPP_MESSAGE = 'Bonjour, je souhaite des informations sur le permis.';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
export const PHONE_DISPLAY = '06 99 77 45 76';
export const PHONE_TEL = '+33699774576';
export const CONTACT_EMAIL = 'contact@conventionpermis.fr';

export const MOTO_LOCATION =
  "Parc des Expositions de Villepinte (93), à côté du circuit Carole";

// Délai de rappel affiché partout sur le site (à confirmer par Convention Permis).
export const CALLBACK_DELAY = 'sous 24 h ouvrées';

export const FORMATION_LABELS: Record<string, string> = {
  'permis-b-meca': 'Permis B (boîte manuelle)',
  'permis-b-auto': 'Permis B (boîte automatique)',
  'conduite-accompagnee': 'Conduite accompagnée (AAC)',
  'moto-a2': 'Permis moto A2',
};

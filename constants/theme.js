/**
 * Charte graphique FC Fall Collection
 * Noir et or - "La beauté au naturel"
 */
export const colors = {
  // Fond noir profond
  noir: '#0A0A0A',
  noirCarte: '#1A1A1A',
  noirBordure: '#2A2A2A',

  // Or de la marque
  or: '#D4AF37',
  orClair: '#F0D060',
  orFonce: '#A08420',

  // Textes
  blanc: '#FFFFFF',
  gris: '#9E9E9E',
  grisClair: '#6E6E6E',

  // Accents
  vert: '#25D366', // WhatsApp
  rouge: '#E53935',
  blancCasse: '#F5F2EA',
};

export const WHATSAPP_NUMERO = '789513848'; // 78 951 38 48

/** Créé un lien WhatsApp prêt à ouvrir (avec message pré-rempli). */
export function lienWhatsApp(message) {
  return `https://wa.me/221${WHATSAPP_NUMERO}?text=${encodeURIComponent(message)}`;
}

export const slogan = 'Révélez votre beauté naturelle';

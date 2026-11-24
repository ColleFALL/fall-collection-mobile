/**
 * Prestations réservables (booking) — FC Fall Collection.
 *
 * 💡 Modifie ici les prestations, durées et tarifs.
 * "duree" est en minutes, pour un rappel dans le message WhatsApp.
 */
export const prestations = [
  {
    id: 'consultation',
    nom: 'Consultation Capillaire',
    prix: 5000,
    emoji: '💬',
    duree: 45,
    description:
      'Analyse de tes cheveux et de ta routine, avec recommandations produits FC personnalisées.',
  },
  {
    id: 'soin-complet',
    nom: 'Soin Capillaire Complet FC',
    prix: 15000,
    emoji: '🌿',
    duree: 90,
    description:
      'Le soin signature : traitement capillaire FC, massage du cuir chevelu, coiffage. Cheveux nourris et brillants.',
  },
  {
    id: 'application-produit',
    nom: 'Application de Produit',
    prix: 7500,
    emoji: '✋',
    duree: 45,
    description:
      'Application des produits FC par une pro, à domicile ou en salon — apprentissage des bons gestes.',
  },
  {
    id: 'tresse-couleur',
    nom: 'Conseil Tresses & Couleur',
    prix: 6000,
    emoji: '🎨',
    duree: 45,
    description:
      'Choix des styles adaptés à ta nature de cheveux et aux produits FC à utiliser.',
  },
];

/** Horaires de réservation proposés */
export const horaires = [
  '09:00', '10:30', '12:00', '14:00', '15:30', '17:00', '18:30',
];

/** Formate une date en français : "lun. 24 nov." */
export function formaterDate(date) {
  const jours = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'];
  const mois = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
  return `${jours[date.getDay()]} ${date.getDate()} ${mois[date.getMonth()]}`;
}

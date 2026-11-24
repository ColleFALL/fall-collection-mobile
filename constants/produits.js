/**
 * Catalogue des produits FC Fall Collection.
 *
 * 💡 Pour modifier un produit : change simplement le texte ici,
 * l'app se met à jour toute seule sur le téléphone.
 *
 * "emoji" sert d'image provisoire — on remplacera par de vraies
 * photos quand tu m'enverras les visuels FC.
 * "stock" : true = disponible, false = bientôt disponible.
 */
export const produits = [
  {
    id: 'traitement-capillaire',
    nom: 'Traitement Capillaire FC',
    prix: 10000,
    emoji: '🌿',
    couleur: '#2E4B2E',
    description:
      'Le produit phare, actuellement en production. Nutrition en profondeur, favorise la croissance et la brillance des cheveux naturels.',

    avantages: ['Croissance des cheveux', 'Nutrition profonde', 'Brillance naturelle'],
    stock: true,
  },
  {
    id: 'huile-croissance',
    nom: 'Huile de Croissance',
    prix: 5000,
    emoji: '💧',
    couleur: '#3B5333',
    description:
      "Mélange d'huiles naturelles pour stimuler la pousse et renforcer les racines.",
    avantages: ['Stimule la pousse', 'Renforce les racines'],
    stock: true,
  },
  {
    id: 'masque-nutritif',
    nom: 'Masque Nutritif Karité',
    prix: 7500,
    emoji: '🥭',
    couleur: '#5C4020',
    description:
      'Masque riche au karité du Sénégal pour réparer les cheveux secs et abîmés.',
    avantages: ['Répare les cheveux secs', 'Douceur longue durée'],
    stock: true,
  },
  {
    id: 'brillance-quotidien',
    nom: 'Huile de Brillance',
    prix: 4000,
    emoji: '✨',
    couleur: '#6E5A1E',
    description:
      'Une touche de brillance chaque jour, sans graisse, pour sublimer vos mèches.',
    avantages: ['Brillance immédiate', 'Non gras'],
    stock: false,
  },
];

/** Formats 1234 → "1 234 FCFA" */
export function formaterPrix(prix) {
  return `${prix.toLocaleString('fr-FR')} FCFA`;
}

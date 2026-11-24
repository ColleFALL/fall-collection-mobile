import { createContext, useContext, useMemo, useState } from 'react';

/**
 * Le panier : une "mémoire" partagée par tous les écrans.
 *
 * - ajouter(produit)      → ajoute 1 exemplaire du produit
 * - changerQuantite(id, n) → fixe la quantité (n <= 0 retire le produit)
 * - vider()               → panier vide
 * - lignes                → tableau [{ produit, quantite }]
 * - total                 → somme en FCFA
 */

const ContextePanier = createContext(null);

export function PanierProvider({ children }) {
  const [quantites, setQuantites] = useState({}); // ex : { 'huile-croissance': 2 }

  const valeur = useMemo(() => {
    const lignes = Object.entries(quantites)
      .map(([id, quantite]) => ({ id, quantite }))
      .filter((l) => l.quantite > 0);

    const ajouter = (produit) =>
      setQuantites((q) => ({ ...q, [produit.id]: (q[produit.id] || 0) + 1 }));

    const changerQuantite = (id, nouvelle) => {
      setQuantites((q) => {
        const copie = { ...q };
        if (nouvelle <= 0) delete copie[id];
        else copie[id] = nouvelle;
        return copie;
      });
    };

    const vider = () => setQuantites({});

    return { lignes, ajouter, changerQuantite, vider };
  }, [quantites]);

  return <ContextePanier.Provider value={valeur}>{children}</ContextePanier.Provider>;
}

/** Petit crochet pratique : const panier = usePanier(); */
export function usePanier() {
  return useContext(ContextePanier);
}

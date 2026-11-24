import { useState } from 'react';
import {
  Alert,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors, lienWhatsApp } from '../../constants/theme';
import { produits, formaterPrix } from '../../constants/produits';
import { usePanier } from '../../contexte/panier';

const MOYENS_PAIEMENT = ['Wave', 'Orange Money', 'Cash à la livraison'];

/** Frais de livraison par zone (FCFA). Enlèvement : gratuit. */
const FRAIS_LIVRAISON = {
  Dakar: 2000,
  Régions: 4000,
  Enlèvement: 0,
};

/**
 * Écran Panier : récapitulatif, quantités, total, paiement et envoi de la
 * commande par WhatsApp (écran "Panier / Commande" du plan FC).
 */
export default function Panier() {
  const { lignes, changerQuantite, vider } = usePanier();

  // Informations client
  const [nom, setNom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [zone, setZone] = useState('Dakar');
  const [paiement, setPaiement] = useState(MOYENS_PAIEMENT[0]);

  // On joint les infos produit à chaque ligne du panier
  const articles = lignes
    .map((l) => ({
      ...l,
      produit: produits.find((p) => p.id === l.id),
    }))
    .filter((a) => a.produit);

  const total = articles.reduce(
    (somme, a) => somme + a.produit.prix * a.quantite,
    0
  );
  const fraisLivraison = FRAIS_LIVRAISON[zone] ?? 0;
  const totalGeneral = total + fraisLivraison;

  const envoyerCommande = () => {
    if (articles.length === 0) return;
    if (!nom.trim() || !telephone.trim()) {
      Alert.alert('Infos manquantes', 'Merci d’indiquer ton nom et ton téléphone.');
      return;
    }

    const produitsTexte = articles
      .map(
        (a) =>
          `• ${a.produit.nom} × ${a.quantite} — ${formaterPrix(a.produit.prix * a.quantite)}`
      )
      .join('\n');

    const message = [
      '🛍️ *Nouvelle commande FC*',
      '',
      produitsTexte,
      '',
      `Total : *${formaterPrix(totalGeneral)}* (dont ${formaterPrix(fraisLivraison)} de livraison)`,
      '',
      `Nom : ${nom}`,
      `Tél : ${telephone}`,
      `Zone : ${zone}`,
      `Paiement : ${paiement}`,
    ].join('\n');

    const url = lienWhatsApp(message);
    Linking.openURL(url);
    Alert.alert('Commande envoyée ✅', 'FC te répond sur WhatsApp pour confirmer.');
    vider();
  };

  // Panier vide
  if (articles.length === 0) {
    return (
      <View style={[styles.conteneur, styles.centre]}>
        <Text style={styles.panierVideEmoji}>🛒</Text>
        <Text style={styles.panierVideTexte}>Ton panier est vide</Text>
        <Text style={styles.panierVideSousTexte}>
          Va à l’onglet Boutique et touche « ＋ Panier »
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.conteneur}>
      {/* Liste des articles */}
      <View style={styles.liste}>
        {articles.map((a) => (
          <View key={a.id} style={styles.ligne}>
            <View style={[styles.miniImage, { backgroundColor: a.produit.couleur }]}>
              <Text style={styles.miniEmoji}>{a.produit.emoji}</Text>
            </View>

            <View style={styles.ligneInfos}>
              <Text style={styles.ligneNom}>{a.produit.nom}</Text>
              <Text style={styles.lignePrix}>
                {formaterPrix(a.produit.prix * a.quantite)}
              </Text>
            </View>

            {/* Contrôles de quantité */}
            <View style={styles.quantite}>
              <Pressable
                style={styles.qBtn}
                onPress={() => changerQuantite(a.id, a.quantite - 1)}
              >
                <Text style={styles.qBtnTexte}>−</Text>
              </Pressable>
              <Text style={styles.qNombre}>{a.quantite}</Text>
              <Pressable
                style={styles.qBtn}
                onPress={() => changerQuantite(a.id, a.quantite + 1)}
              >
                <Text style={styles.qBtnTexte}>＋</Text>
              </Pressable>
            </View>
          </View>
        ))}

        {/* Total articles + livraison */}
        <View style={[styles.totalLigne, styles.separateur]}>
          <Text style={styles.totalTexte}>Total</Text>
          <Text style={styles.totalValeur}>{formaterPrix(total)}</Text>
        </View>
        <View style={styles.totalLigne}>
          <Text style={styles.sousTotalTexte}>
            Livraison ({zone})
          </Text>
          <Text style={styles.sousTotalValeur}>
            {fraisLivraison === 0 ? 'Gratuit' : formaterPrix(fraisLivraison)}
          </Text>
        </View>
        <View style={styles.finalLigne}>
          <Text style={styles.finalTexte}>À payer</Text>
          <Text style={styles.finalValeur}>{formaterPrix(totalGeneral)}</Text>
        </View>
      </View>

      {/* Coordonnées client */}
      <Text style={styles.sectionTitre}>Tes coordonnées</Text>
      <TextInput
        style={styles.champ}
        placeholder="Nom et prénom"
        placeholderTextColor={colors.grisClair}
        value={nom}
        onChangeText={setNom}
      />
      <TextInput
        style={styles.champ}
        placeholder="Téléphone (ex : 77 123 45 67)"
        placeholderTextColor={colors.grisClair}
        keyboardType="phone-pad"
        value={telephone}
        onChangeText={setTelephone}
      />

      {/* Zone de livraison */}
      <Text style={styles.sectionTitre}>Livraison</Text>
      <View style={styles.choixLigne}>
        {['Dakar', 'Régions', 'Enlèvement'].map((z) => (
          <Pressable
            key={z}
            style={[styles.choix, zone === z && styles.choixActif]}
            onPress={() => setZone(z)}
          >
            <Text style={[styles.choixTexte, zone === z && styles.choixTexteActif]}>
              {z}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Paiement */}
      <Text style={styles.sectionTitre}>Paiement</Text>
      <View style={styles.choixLigne}>
        {MOYENS_PAIEMENT.map((m) => (
          <Pressable
            key={m}
            style={[styles.choix, paiement === m && styles.choixActif]}
            onPress={() => setPaiement(m)}
          >
            <Text style={[styles.choixTexte, paiement === m && styles.choixTexteActif]}>
              {m}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Envoi */}
      <Pressable style={styles.boutonEnvoyer} onPress={envoyerCommande}>
        <Text style={styles.boutonEnvoyerTexte}>
          📤 Envoyer la commande sur WhatsApp
        </Text>
      </Pressable>
      <Text style={styles.note}>
        Une fenêtre WhatsApp s’ouvre avec ta commande déjà écrite — il suffit
        d’appuyer sur Envoyer.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  conteneur: {
    flex: 1,
    backgroundColor: colors.noir,
    padding: 16,
  },
  centre: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  panierVideEmoji: { fontSize: 64 },
  panierVideTexte: { color: colors.blanc, fontSize: 20, fontWeight: 'bold', marginTop: 12 },
  panierVideSousTexte: { color: colors.gris, marginTop: 8, textAlign: 'center' },

  liste: { backgroundColor: colors.noirCarte, borderRadius: 16, borderWidth: 1, borderColor: colors.noirBordure, padding: 12 },
  ligne: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  miniImage: { width: 44, height: 44, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  miniEmoji: { fontSize: 22 },
  ligneInfos: { flex: 1, marginLeft: 12 },
  ligneNom: { color: colors.blanc, fontSize: 15, fontWeight: '600' },
  lignePrix: { color: colors.or, fontSize: 14, marginTop: 2 },
  quantite: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  qBtn: { width: 32, height: 32, borderRadius: 8, backgroundColor: colors.noir, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.noirBordure },
  qBtnTexte: { color: colors.or, fontSize: 18, fontWeight: 'bold' },
  qNombre: { color: colors.blanc, fontSize: 16, fontWeight: 'bold', minWidth: 20, textAlign: 'center' },
  totalLigne: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, paddingTop: 8 },
  separateur: { borderTopWidth: 1, borderTopColor: '#2A2A2A' },
  totalTexte: { color: colors.gris, fontSize: 15 },
  totalValeur: { color: colors.blanc, fontSize: 15 },
  sousTotalTexte: { color: colors.gris, fontSize: 13 },
  sousTotalValeur: { color: colors.gris, fontSize: 13 },
  finalLigne: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: colors.noirBordure, marginTop: 12, paddingTop: 12 },
  finalTexte: { color: colors.blanc, fontSize: 16, fontWeight: 'bold' },
  finalValeur: { color: colors.or, fontSize: 20, fontWeight: 'bold' },

  sectionTitre: { color: colors.or, fontWeight: 'bold', marginTop: 20, marginBottom: 8 },
  champ: { backgroundColor: colors.noirCarte, borderWidth: 1, borderColor: colors.noirBordure, borderRadius: 12, color: colors.blanc, paddingVertical: 12, paddingHorizontal: 16, fontSize: 15, marginBottom: 10 },
  choixLigne: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  choix: { borderWidth: 1, borderColor: colors.noirBordure, borderRadius: 10, paddingVertical: 8, paddingHorizontal: 14 },
  choixActif: { borderColor: colors.or, backgroundColor: 'rgba(212,175,55,0.12)' },
  choixTexte: { color: colors.gris, fontSize: 14 },
  choixTexteActif: { color: colors.or, fontWeight: 'bold' },

  boutonEnvoyer: { backgroundColor: colors.vert, paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 24 },
  boutonEnvoyerTexte: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  note: { color: colors.grisClair, fontSize: 12, textAlign: 'center', marginTop: 10 },
});

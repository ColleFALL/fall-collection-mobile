import { Linking, Pressable, StyleSheet, Text, FlatList, View } from 'react-native';
import { router } from 'expo-router';
import { usePanier } from '../../contexte/panier';
import { colors, lienWhatsApp } from '../../constants/theme';
import { produits, formaterPrix } from '../../constants/produits';

/**
 * Écran Boutique : catalogue des produits FC avec bouton Commander.
 */
export default function Boutique() {
  // On enlève les produits indisponibles de la liste visible
  const produitsDisponibles = produits.filter((p) => p.stock);
  const { ajouter } = usePanier();

  const commander = (produit) => {
    const message = `Bonjour FC 👋\nJe souhaite commander :\n• ${produit.nom} — ${formaterPrix(produit.prix)}`;
    Linking.openURL(lienWhatsApp(message));
  };

  const rendreProduit = ({ item }) => (
    <Pressable
      style={({ pressed }) => [
        styles.carte,
        pressed && styles.cartePressée,
      ]}
      onPress={() => router.push(`/produit/${item.id}`)}
    >
      {/* Image provisoire (emoji sur fond couleur) — remplacée par de vraies photos plus tard */}
      <View style={[styles.imageProvisoire, { backgroundColor: item.couleur }]}>
        <Text style={styles.imageEmoji}>{item.emoji}</Text>
      </View>

      <View style={styles.carteInfos}>
        <Text style={styles.nomProduit}>{item.nom}</Text>
        <Text style={styles.prix}>{formaterPrix(item.prix)}</Text>

        {/* Pastilles d'avantages */}

        <View style={styles.avantages}>
          {item.avantages.map((a) => (
            <Text key={a} style={styles.avantage}>
              {a}
            </Text>
          ))}
        </View>

        <Text style={styles.hint}>Voir la fiche produit ›</Text>
      </View>

      <View style={styles.boutonsCarte}>
        <Pressable
          style={[styles.boutonCommander, styles.boutonSecours]}
          onPress={() => ajouter(item)}
        >
          <Text style={styles.boutonTexteSecours}>＋ Panier</Text>
        </Pressable>
        <Pressable style={styles.boutonCommander} onPress={() => commander(item)}>
          <Text style={styles.boutonTexte}>Commander</Text>
        </Pressable>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.conteneur}>
      <Text style={styles.intro}>
        Cosmétiques naturels FC — paiement Wave, Orange Money ou à la livraison
      </Text>

      <FlatList
        data={produitsDisponibles}
        renderItem={rendreProduit}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.liste}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  conteneur: {
    flex: 1,
    backgroundColor: colors.noir,
  },
  intro: {
    color: colors.gris,
    fontSize: 14,
    textAlign: 'center',
    padding: 16,
    paddingBottom: 8,
  },
  liste: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 16,
  },
  carte: {
    backgroundColor: colors.noirCarte,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.noirBordure,
    overflow: 'hidden',
  },
  cartePressée: {
    opacity: 0.8,
    transform: [{ scale: 0.99 }],
  },
  imageProvisoire: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageEmoji: {
    fontSize: 56,
  },
  carteInfos: {
    padding: 16,
  },
  nomProduit: {
    color: colors.blanc,
    fontSize: 18,
    fontWeight: 'bold',
  },
  prix: {
    color: colors.or,
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
  },
  avantages: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  avantage: {
    color: colors.orClair,
    fontSize: 12,
    backgroundColor: 'rgba(212, 175, 55, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.35)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  hint: {
    color: colors.grisClair,
    fontSize: 13,
    marginTop: 12,
  },
  boutonCommander: {
    backgroundColor: colors.or,
    marginTop: 0,
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  boutonsCarte: {
    flexDirection: 'row',
    gap: 12,
    margin: 16,
    marginTop: 4,
  },
  boutonSecours: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.or,
  },
  boutonTexteSecours: {
    color: colors.or,
    fontWeight: 'bold',
    fontSize: 15,
  },
  boutonTexte: {
    color: colors.noir,
    fontWeight: 'bold',
    fontSize: 15,
  },
});

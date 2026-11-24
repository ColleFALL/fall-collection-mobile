import { Linking, Pressable, StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { colors, lienWhatsApp } from '../../constants/theme';
import { produits, formaterPrix } from '../../constants/produits';
import { usePanier } from '../../contexte/panier';

/**
 * Fiche produit détaillée.
 * L'identifiant du produit arrive dans l'URL, ex : /produit/traitement-capillaire
 */
export default function FicheProduit() {
  const { id } = useLocalSearchParams();
  const produit = produits.find((p) => p.id === id);

  // Sécurité : si l'identifiant est inconnu, on affiche un message simple
  if (!produit) {
    return (
      <View style={styles.conteneur}>
        <Text style={styles.nonTrouve}>Produit introuvable 🤔</Text>
      </View>
    );
  }

  const { ajouter } = usePanier();

  const commander = () => {
    const message = `Bonjour FC 👋\nJe souhaite commander :\n• ${produit.nom} — ${formaterPrix(produit.prix)}`;
    Linking.openURL(lienWhatsApp(message));
  };

  return (
    <>
      {/* Titre de la barre du haut = nom du produit */}
      <Stack.Screen options={{ title: produit.nom }} />
    <ScrollView style={styles.scroll} contentContainerStyle={styles.conteneur}>
      {/* Image provisoire (emoji) — sera remplacée par la vraie photo FC */}
      <View style={[styles.imageGrande, { backgroundColor: produit.couleur }]}>
        <Text style={styles.imageEmoji}>{produit.emoji}</Text>
      </View>

      <Text style={styles.nom}>{produit.nom}</Text>
      <Text style={styles.prix}>{formaterPrix(produit.prix)}</Text>

      {!produit.stock && (
        <Text style={styles.indisponible}>⚫ Bientôt disponible</Text>
      )}

      <Text style={styles.sectionTitre}>Description</Text>
      <Text style={styles.paragraphe}>{produit.description}</Text>

      <Text style={styles.sectionTitre}>Bénéfices</Text>
      {produit.avantages.map((avantage) => (
        <Text key={avantage} style={styles.avantage}>
          ✦ {avantage}
        </Text>
      ))}

      <View style={styles.boutons}>
        <Pressable
          style={[styles.boutonCommander, styles.boutonSecours]}
          onPress={() => {
            ajouter(produit);
            Alert.alert('Ajouté au panier ✅', `${produit.nom} se trouve dans ton panier.`);
          }}
        >
          <Text style={styles.boutonTexteSecours}>＋ Panier</Text>
        </Pressable>
        <Pressable style={styles.boutonCommander} onPress={commander}>
          <Text style={styles.boutonTexte}>💬 WhatsApp</Text>
        </Pressable>
      </View>

      <Text style={styles.paiement}>
        Paiement : Wave · Orange Money · Espèces à la livraison
      </Text>
      <Text style={styles.livraison}>
        Livraison Dakar et régions — frais affichés à la commande
      </Text>
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: colors.noir,
  },
  conteneur: {
    padding: 16,
    paddingBottom: 40,
  },
  imageGrande: {
    height: 220,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageEmoji: {
    fontSize: 96,
  },
  nom: {
    color: colors.blanc,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  prix: {
    color: colors.or,
    fontSize: 20,
    fontWeight: '600',
    marginTop: 4,
  },
  indisponible: {
    color: colors.gris,
    fontStyle: 'italic',
    marginTop: 8,
  },
  sectionTitre: {
    color: colors.or,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
  },
  paragraphe: {
    color: colors.gris,
    fontSize: 15,
    lineHeight: 22,
  },
  avantage: {
    color: colors.blancCasse,
    fontSize: 15,
    lineHeight: 26,
  },
  boutonCommander: {
    backgroundColor: colors.or,
    marginTop: 0,
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  boutons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 32,
  },
  boutonSecours: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.or,
  },
  boutonTexteSecours: {
    color: colors.or,
    fontWeight: 'bold',
    fontSize: 16,
  },
  boutonTexte: {
    color: colors.noir,
    fontWeight: 'bold',
    fontSize: 16,
  },
  paiement: {
    color: colors.gris,
    fontSize: 13,
    textAlign: 'center',
    marginTop: 16,
  },
  livraison: {
    color: colors.grisClair,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
  nonTrouve: {
    color: colors.blanc,
    fontSize: 16,
    textAlign: 'center',
  },
});

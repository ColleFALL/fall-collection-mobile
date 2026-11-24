import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { colors, slogan, lienWhatsApp } from '../../constants/theme';

/**
 * Écran d'accueil FC Fall Collection
 */
export default function Accueil() {
  const ouvrirWhatsApp = () => {
    const url = lienWhatsApp('Bonjour FC 👋 Je souhaite commander un produit.');
    Linking.openURL(url);
  };

  return (
    <View style={styles.conteneur}>
      {/* Logo / nom de la marque */}
      <View style={styles.logo}>
        <Text style={styles.logoTexte}>FC</Text>
        <Text style={styles.logoSousTexte}>FALL COLLECTION</Text>
      </View>

      <Text style={styles.slogan}>{slogan}</Text>
      <Text style={styles.description}>
        Produits de beauté naturels : cosmetiques FC et soins capillaires,
        livrés partout au Sénégal.
      </Text>

      {/* Bouton WhatsApp direct */}
      <Pressable style={styles.boutonWhatsApp} onPress={ouvrirWhatsApp}>
        <Text style={styles.boutonTexte}>💬 Commander sur WhatsApp</Text>
      </Pressable>

      {/* Indication vers les autres onglets */}
      <View style={styles.apercuBoutique}>
        <Text style={styles.apercuTexte}>
          🛍️ « Boutique » → les produits · 📅 « Booking » → tes rendez-vous
        </Text>
      </View>

      {/* Accès aux pages À propos et Contact */}
      <View style={styles.liensBas}>
        <Pressable onPress={() => router.push('/a-propos')}>
          <Text style={styles.lien}>À propos de la marque</Text>
        </Pressable>
        <Text style={styles.point}>·</Text>
        <Pressable onPress={() => router.push('/contact')}>
          <Text style={styles.lien}>Contact</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conteneur: {
    flex: 1,
    backgroundColor: colors.noir,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoTexte: {
    fontSize: 64,
    fontWeight: 'bold',
    color: colors.or,
    letterSpacing: 4,
  },
  logoSousTexte: {
    fontSize: 16,
    color: colors.blanc,
    letterSpacing: 8,
    marginTop: 4,
  },
  slogan: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.orClair,
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: colors.gris,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  boutonWhatsApp: {
    backgroundColor: colors.vert,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
  },
  boutonTexte: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  apercuBoutique: {
    marginTop: 32,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.noirBordure,
    backgroundColor: colors.noirCarte,
  },
  apercuTexte: {
    color: colors.gris,
    fontSize: 14,
  },
  liensBas: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 16,
  },
  lien: {
    color: colors.or,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  point: {
    color: colors.grisClair,
  },
});

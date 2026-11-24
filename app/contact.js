import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { Stack } from 'expo-router';
import { colors, lienWhatsApp, WHATSAPP_NUMERO } from '../constants/theme';

/**
 * Page Contact : WhatsApp, téléphone, réseaux sociaux, localisation.
 */
export default function Contact() {
  const ouvrirWhatsApp = () =>
    Linking.openURL(lienWhatsApp('Bonjour FC 👋 J\u2019ai une question.'));
  const appeler = () => Linking.openURL('tel:+221789513848');

  return (
    <View style={styles.conteneur}>
      <Stack.Screen options={{ title: 'Contact' }} />

      <Text style={styles.intro}>
        Une question sur un produit, une commande ou un rendez-vous ?
        FC te répond sur WhatsApp. 💬
      </Text>

      {/* WhatsApp */}
      <Pressable style={[styles.carte, { backgroundColor: '#128C4B' }]} onPress={ouvrirWhatsApp}>
        <Text style={styles.carteEmoji}>💬</Text>
        <View>
          <Text style={styles.carteTitre}>WhatsApp</Text>
          <Text style={styles.carteSousTitre}>78 951 38 48 — réponse rapide</Text>
        </View>
      </Pressable>

      {/* Téléphone */}
      <Pressable style={styles.carte} onPress={appeler}>
        <Text style={styles.carteEmoji}>📞</Text>
        <View>
          <Text style={styles.carteTitre}>Appeler</Text>
          <Text style={styles.carteSousTitre}>+221 78 951 38 48</Text>
        </View>
      </Pressable>

      {/* Réseaux sociaux — à compléter avec les vraies pages FC */}
      <View style={styles.carte}>
        <Text style={styles.carteEmoji}>❤️</Text>
        <View>
          <Text style={styles.carteTitre}>Réseaux sociaux</Text>
          <Text style={styles.carteSousTitre}>Facebook · Instagram · TikTok</Text>
        </View>
      </View>

      {/* Localisation */}
      <View style={styles.carte}>
        <Text style={styles.carteEmoji}>📍</Text>
        <View>
          <Text style={styles.carteTitre}>Localisation</Text>
          <Text style={styles.carteSousTitre}>Dakar, Sénégal — livraison Dakar & régions</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conteneur: { flex: 1, backgroundColor: colors.noir, padding: 16 },
  intro: { color: colors.gris, fontSize: 14, textAlign: 'center', marginBottom: 20, lineHeight: 20 },
  carte: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.noirCarte, borderWidth: 1, borderColor: colors.noirBordure, borderRadius: 14, padding: 16, marginBottom: 12 },
  carteEmoji: { fontSize: 26, marginRight: 14 },
  carteTitre: { color: colors.blanc, fontSize: 16, fontWeight: 'bold' },
  carteSousTitre: { color: colors.gris, fontSize: 13, marginTop: 2 },
});

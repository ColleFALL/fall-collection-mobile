import { Stack } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/theme';

/**
 * Page À propos : l'histoire de FC, la marque, les valeurs.
 */
export default function APropos() {
  return (
    <View style={styles.conteneur}>
      <Stack.Screen options={{ title: 'À propos' }} />

      <Text style={styles.logo}>FC</Text>
      <Text style={styles.sousTitre}>LA BEAUTÉ AU NATUREL</Text>

      <Text style={styles.paragraphe}>
        Fall Collection (FC) est née d'une conviction simple : la beauté
        naturelle des femmes du Sénégal mérite des produits naturels, doux et
        efficaces.
      </Text>
      <Text style={styles.paragraphe}>
        Des soins capillaires aux cosmétiques du quotidien, chaque produit FC
        est pensé pour révéler votre beauté naturelle — sans produits agressifs,
        avec des ingrédients que vos cheveux et votre peau reconnaissent.
      </Text>

      <View style={styles.valeurs}>
        <Text style={styles.valeurTitre}>Nos valeurs</Text>
        <Text style={styles.valeur}>🌿 Le naturel, toujours en priorité</Text>
        <Text style={styles.valeur}>✨ La qualité, sans compromis</Text>
        <Text style={styles.valeur}>🤝 La confiance, à chaque commande</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conteneur: { flex: 1, backgroundColor: colors.noir, padding: 24, alignItems: 'center' },
  logo: { color: colors.or, fontSize: 56, fontWeight: 'bold', letterSpacing: 4, marginTop: 8 },
  sousTitre: { color: colors.blanc, fontSize: 13, letterSpacing: 6, marginTop: 4, marginBottom: 24 },
  paragraphe: { color: colors.gris, fontSize: 15, lineHeight: 24, textAlign: 'center', marginBottom: 16 },
  valeurs: { backgroundColor: colors.noirCarte, borderWidth: 1, borderColor: colors.noirBordure, borderRadius: 16, padding: 20, marginTop: 16, width: '100%' },
  valeurTitre: { color: colors.or, fontWeight: 'bold', fontSize: 16, marginBottom: 10, textAlign: 'center' },
  valeur: { color: colors.blancCasse, fontSize: 15, lineHeight: 28, textAlign: 'center' },
});

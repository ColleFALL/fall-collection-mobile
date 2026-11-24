import { Tabs } from 'expo-router';
import { colors } from '../../constants/theme';
import { usePanier } from '../../contexte/panier';

/**
 * Onglets principaux : Accueil, Boutique, Panier, Booking.
 * La barre en bas de l'écran, aux couleurs FC.
 * L'onglet Panier affiche le nombre d'articles en badge doré.
 */
export default function Onglets() {
  const { lignes } = usePanier();
  const nombreArticles = lignes.reduce((somme, l) => somme + l.quantite, 0);

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.noir },
        headerTintColor: colors.or,
        headerTitleStyle: { fontWeight: 'bold' },
        tabBarStyle: {
          backgroundColor: colors.noirCarte,
          borderTopColor: colors.noirBordure,
        },
        tabBarActiveTintColor: colors.or,
        tabBarInactiveTintColor: colors.gris,
        tabBarBadgeStyle: {
          backgroundColor: colors.or,
          color: colors.noir,
          fontSize: 11,
          fontWeight: 'bold',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Accueil', headerTitle: 'FC Fall Collection' }}
      />
      <Tabs.Screen name="boutique" options={{ title: 'Boutique' }} />
      <Tabs.Screen
        name="panier"
        options={{ title: 'Panier', tabBarBadge: nombreArticles || undefined }}
      />
      <Tabs.Screen name="booking" options={{ title: 'Booking' }} />
    </Tabs>
  );
}

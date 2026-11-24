import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../constants/theme';
import { PanierProvider } from '../contexte/panier';

/**
 * Mise en page globale de l'app.
 * Toutes les pages (screens) passent par ce Stack.
 * PanierProvider englobe tout : le panier est partagé entre les écrans.
 */
export default function Layout() {
  return (
    <PanierProvider>
      <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.noir },
        headerTintColor: colors.or,
        headerTitleStyle: { fontWeight: 'bold' },
        contentStyle: { backgroundColor: colors.noir },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </PanierProvider>
  );
}

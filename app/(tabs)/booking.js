import { useMemo, useState } from 'react';
import {
  Alert,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors, lienWhatsApp } from '../../constants/theme';
import { formaterPrix } from '../../constants/produits';
import {
  prestations,
  horaires,
  formaterDate,
} from '../../constants/prestations';

/**
 * Écran Booking : réservation de prestations.
 * Parcours : prestation → date → heure → lieu → coordonnées → WhatsApp.
 */
export default function Booking() {
  const [prestationId, setPrestationId] = useState(null);
  const [dateIdx, setDateIdx] = useState(null);
  const [heure, setHeure] = useState(null);
  const [lieu, setLieu] = useState(null); // 'Domicile' ou 'Salon'
  const [nom, setNom] = useState('');
  const [telephone, setTelephone] = useState('');

  // 14 prochains jours disponibles
  const jours = useMemo(() => {
    const liste = [];
    const aujourdhui = new Date();
    for (let i = 1; i <= 14; i++) {
      const d = new Date(aujourdhui);
      d.setDate(d.getDate() + i);
      liste.push(d);
    }
    return liste;
  }, []);

  const prestation = prestations.find((p) => p.id === prestationId);
  const dateChoisie = dateIdx !== null ? jours[dateIdx] : null;

  const complet = prestation && dateChoisie && heure && lieu && nom.trim() && telephone.trim();

  const envoyer = () => {
    if (!prestation || !dateChoisie || !heure || !lieu) {
      Alert.alert('Presque !', 'Choisis la prestation, la date, l\u2019heure et le lieu.');
      return;
    }
    if (!nom.trim() || !telephone.trim()) {
      Alert.alert('Infos manquantes', 'Merci d\u2019indiquer ton nom et ton téléphone.');
      return;
    }

    const message = [
      '📅 *Nouvelle réservation FC*',
      '',
      `Prestation : *${prestation.nom}* (${formaterPrix(prestation.prix)})`,
      `Durée : environ ${prestation.duree} min`,
      `Date : *${formaterDate(dateChoisie)}*`,
      `Heure : *${heure}*`,
      `Lieu : *${lieu}*`,
      '',
      `Nom : ${nom}`,
      `Tél : ${telephone}`,
    ].join('\n');

    Linking.openURL(lienWhatsApp(message));
    Alert.alert('Demande envoyée ✅', 'FC te répond sur WhatsApp pour confirmer le rendez-vous.');
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.conteneur}>
      <Text style={styles.intro}>
        Réserve ta prestation en 4 touches — et rejoins-nous à domicile ou en salon !
      </Text>

      {/* Étape 1 : prestation */}
      <Text style={styles.etape}>1️⃣ Choisir la prestation</Text>
      {prestations.map((p) => {
        const actif = p.id === prestationId;
        return (
          <Pressable
            key={p.id}
            style={[styles.prestation, actif && styles.actif]}
            onPress={() => setPrestationId(p.id)}
          >
            <Text style={styles.prestationEmoji}>{p.emoji}</Text>
            <View style={styles.prestationInfos}>
              <Text style={styles.prestationNom}>{p.nom}</Text>
              <Text style={styles.prestationDetail}>
                {formaterPrix(p.prix)} · {p.duree} min
              </Text>
              {actif && (
                <Text style={styles.prestationDescription}>{p.description}</Text>
              )}
            </View>
            <Text style={[styles.tick, actif && styles.tickActif]}>
              {actif ? '✓' : ''}
            </Text>
          </Pressable>
        );
      })}

      {/* Étape 2 : date */}
      <Text style={styles.etape}>2️⃣ Choisir la date</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.ligneDates}>
        {jours.map((d, i) => {
          const actif = i === dateIdx;
          return (
            <Pressable
              key={i}
              style={[styles.date, actif && styles.actif]}
              onPress={() => setDateIdx(i)}
            >
              <Text style={[styles.dateTexte, actif && styles.texteActif]}>
                {formaterDate(d)}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Étape 3 : heure */}
      <Text style={styles.etape}>3️⃣ Choisir l'heure</Text>
      <View style={styles.grille}>
        {horaires.map((h) => {
          const actif = h === heure;
          return (
            <Pressable
              key={h}
              style={[styles.choix, actif && styles.actif]}
              onPress={() => setHeure(h)}
            >
              <Text style={[styles.texte, actif && styles.texteActif]}>{h}</Text>
            </Pressable>
          );
        })}
      </View>

      {/* Étape 4 : lieu */}
      <Text style={styles.etape}>4️⃣ Choisir le lieu</Text>
      <View style={styles.grille}>
        {['🏠 À domicile', '💇 En salon'].map((l) => {
          const actif = lieu === l;
          return (
            <Pressable
              key={l}
              style={[styles.choixLarge, actif && styles.actif]}
              onPress={() => setLieu(l)}
            >
              <Text style={[styles.texte, actif && styles.texteActif]}>{l}</Text>
            </Pressable>
          );
        })}
      </View>

      {/* Coordonnées */}
      <Text style={styles.etape}>5️⃣ Tes coordonnées</Text>
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

      {/* Résumé + envoi */}
      {complet && (
        <Text style={styles.resume}>
          📝 {prestation.nom} · {formaterDate(dateChoisie)} · {heure} · {lieu} —{' '}
          {formaterPrix(prestation.prix)}
        </Text>
      )}

      <Pressable
        style={[styles.bouton, !complet && styles.boutonDesactive]}
        onPress={envoyer}
      >
        <Text style={styles.boutonTexte}>📅 Envoyer la demande sur WhatsApp</Text>
      </Pressable>
      <Text style={styles.note}>
        FC confirme ton rendez-vous sur WhatsApp. Paiement au jour du rdv.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: colors.noir },
  conteneur: { padding: 16, paddingBottom: 40 },
  intro: { color: colors.gris, fontSize: 14, textAlign: 'center', marginBottom: 8 },

  etape: { color: colors.or, fontWeight: 'bold', fontSize: 15, marginTop: 20, marginBottom: 10 },

  prestation: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.noirCarte, borderWidth: 1, borderColor: colors.noirBordure, borderRadius: 14, padding: 14, marginBottom: 10 },
  actif: { borderColor: colors.or, backgroundColor: 'rgba(212,175,55,0.10)' },
  prestationEmoji: { fontSize: 26, marginRight: 12 },
  prestationInfos: { flex: 1 },
  prestationNom: { color: colors.blanc, fontWeight: '600', fontSize: 15 },
  prestationDetail: { color: colors.or, fontSize: 13, marginTop: 2 },
  prestationDescription: { color: colors.gris, fontSize: 13, marginTop: 8, lineHeight: 18 },
  tick: { color: colors.or, fontSize: 22, fontWeight: 'bold', width: 24, textAlign: 'center' },
  tickActif: {},

  ligneDates: { marginBottom: 4 },
  date: { borderWidth: 1, borderColor: colors.noirBordure, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 14, marginRight: 8 },
  dateTexte: { color: colors.gris, fontSize: 14 },

  grille: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  choix: { borderWidth: 1, borderColor: colors.noirBordure, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 16 },
  texte: { color: colors.gris, fontSize: 14 },
  texteActif: { color: colors.or, fontWeight: 'bold' },
  choixLarge: { borderWidth: 1, borderColor: colors.noirBordure, borderRadius: 10, paddingVertical: 12, paddingHorizontal: 20 },

  champ: { backgroundColor: colors.noirCarte, borderWidth: 1, borderColor: colors.noirBordure, borderRadius: 12, color: colors.blanc, paddingVertical: 12, paddingHorizontal: 16, fontSize: 15, marginBottom: 10 },

  resume: { color: colors.blancCasse, fontSize: 14, backgroundColor: colors.noirCarte, borderWidth: 1, borderColor: colors.noirBordure, borderRadius: 12, padding: 12, marginTop: 16 },

  bouton: { backgroundColor: colors.vert, paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  boutonDesactive: { opacity: 0.5 },
  boutonTexte: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  note: { color: colors.grisClair, fontSize: 12, textAlign: 'center', marginTop: 10 },
});

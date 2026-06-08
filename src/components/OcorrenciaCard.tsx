import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ocorrencia } from '../types';

type Props = {
  trecho: Ocorrencia;
  onPress: () => void;
};

export default function OcorrenciaCard({ trecho, onPress }: Props) {
  const corRisco = trecho.risco === 'alto' ? '#ff4c4c' : trecho.risco === 'medio' ? '#ffcc00' : '#4caf50';

  return (
    <TouchableOpacity style={[styles.card, { borderLeftColor: corRisco }]} onPress={onPress}>
      <Text style={styles.titulo}>{trecho.rodovia} - KM {trecho.km}</Text>
      <Text style={styles.subtitulo}>Risco: {trecho.risco.toUpperCase()}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    borderLeftWidth: 5,
    elevation: 2,
  },
  titulo: { fontSize: 16, fontWeight: 'bold' },
  subtitulo: { fontSize: 14, color: '#666', marginTop: 4 },
});
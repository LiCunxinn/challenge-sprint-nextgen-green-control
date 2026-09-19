import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ocorrencia } from '../types';

type Props = {
  ocorrencia: Ocorrencia;
  onPress: () => void;
};

export default function OcorrenciaCard({ ocorrencia, onPress }: Props) {
  const corRisco = 
    ocorrencia.risco === 'alto' ? '#D32F2F' : 
    ocorrencia.risco === 'medio' ? '#F57C00' : '#388E3C';

  return (
    <TouchableOpacity style={[styles.card, { borderLeftColor: corRisco }]} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.titulo}>{ocorrencia.local}</Text>
        <View style={[styles.badge, { backgroundColor: corRisco }]}>
          <Text style={styles.badgeText}>{ocorrencia.risco.toUpperCase()}</Text>
        </View>
      </View>
      <Text style={styles.descricao} numberOfLines={1}>{ocorrencia.descricao}</Text>
      <Text style={styles.data}>Data: {ocorrencia.data}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 6,
    borderRadius: 8,
    borderLeftWidth: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  titulo: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  descricao: { fontSize: 14, color: '#666', marginTop: 6 },
  data: { fontSize: 12, color: '#999', marginTop: 6 },
});
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Ocorrencia } from '../types';

type Props = {
  ocorrencia: Ocorrencia;
  setTelaAtual: (tela: "lista" | "cadastro" | "detalhe") => void;
};

export default function DetalheScreen({ ocorrencia, setTelaAtual }: Props) {
  const corRisco = 
    ocorrencia.risco === 'alto' ? '#D32F2F' : 
    ocorrencia.risco === 'medio' ? '#F57C00' : '#388E3C';

  return (
    <View style={styles.tela}>
      <Text style={styles.header}>Detalhe da Ocorrência</Text>
      
      <View style={styles.card}>
        <Text style={styles.campo}><Text style={styles.bold}>Local:</Text> {ocorrencia.local}</Text>
        <Text style={styles.campo}><Text style={styles.bold}>Rodovia:</Text> {ocorrencia.rodovia}</Text>
        <Text style={styles.campo}><Text style={styles.bold}>KM:</Text> {ocorrencia.km}</Text>
        <Text style={styles.campo}><Text style={styles.bold}>Data de Registro:</Text> {ocorrencia.data}</Text>
        
        <View style={styles.riscoContainer}>
          <Text style={styles.bold}>Classificação de Risco: </Text>
          <View style={[styles.badge, { backgroundColor: corRisco }]}>
            <Text style={styles.badgeText}>{ocorrencia.risco.toUpperCase()}</Text>
          </View>
        </View>

        <Text style={[styles.bold, { marginTop: 15 }]}>Descrição do Fator de Risco:</Text>
        <Text style={styles.descricaoBox}>{ocorrencia.descricao}</Text>
      </View>

      <Button title="Voltar para a Lista" onPress={() => setTelaAtual("lista")} color="#1E88E5" />
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 8, marginBottom: 20, elevation: 2 },
  campo: { fontSize: 16, marginBottom: 8 },
  bold: { fontWeight: 'bold', color: '#333' },
  riscoContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4, marginLeft: 6 },
  badgeText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  descricaoBox: { backgroundColor: '#f9f9f9', padding: 12, borderRadius: 6, marginTop: 6, borderWidth: 1, borderColor: '#eee', color: '#555' }
});
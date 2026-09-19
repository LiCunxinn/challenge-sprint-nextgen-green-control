import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { Ocorrencia } from '../types';
import { OcorrenciaCard } from '../components';

type Props = {
  ocorrencias: Ocorrencia[];
  setTelaAtual: (tela: "lista" | "cadastro" | "detalhe") => void;
  setOcorrenciaSelecionada: (ocorrencia: Ocorrencia) => void;
};

export default function ListaScreen({ ocorrencias, setTelaAtual, setOcorrenciaSelecionada }: Props) {
  return (
    <View style={styles.tela}>
      <Text style={styles.header}>Ocorrências Rodoviárias</Text>
      <Button title="+ Nova Ocorrência" onPress={() => setTelaAtual("cadastro")} color="#1E88E5" />
      <FlatList
        data={ocorrencias}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OcorrenciaCard 
            ocorrencia={item} 
            onPress={() => {
              setOcorrenciaSelecionada(item);
              setTelaAtual("detalhe");
            }} 
          />
        )}
        contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
        ListEmptyComponent={
          <Text style={styles.vazio}>Nenhuma ocorrência registrada.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, textAlign: 'center', color: '#111' },
  vazio: { textAlign: 'center', marginTop: 30, color: '#888' }
});
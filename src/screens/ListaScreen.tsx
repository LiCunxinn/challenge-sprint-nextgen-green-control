import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { OcorrenciaCard } from '../components';
import { Ocorrencia } from '../types';

type Props = {
  trechos: Ocorrencia[];
  setTelaAtual: (tela: "lista" | "cadastro" | "detalhe") => void;
  setTrechoSelecionado: (trecho: Ocorrencia) => void;
};

export default function ListaScreen({ trechos, setTelaAtual, setTrechoSelecionado }: Props) {
  return (
    <View style={styles.tela}>
      <Text style={styles.header}>Monitoramento de Vegetação</Text>
      <Button title="+ Novo Registro de Campo" onPress={() => setTelaAtual("cadastro")} />
      <FlatList
        data={trechos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OcorrenciaCard 
            trecho={item} 
            onPress={() => {
              setTrechoSelecionado(item);
              setTelaAtual("detalhe");
            }} 
          />
        )}
        style={{ marginTop: 15 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
});
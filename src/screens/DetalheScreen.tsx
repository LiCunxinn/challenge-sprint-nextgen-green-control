import { Button, StyleSheet, Text, View } from 'react-native';
import { Ocorrencia } from '../types';

type Props = {
  trecho: Ocorrencia;
  setTelaAtual: (tela: "lista" | "cadastro" | "detalhe") => void;
};

export default function DetalheScreen({ trecho, setTelaAtual }: Props) {
  return (
    <View style={styles.tela}>
      <Text style={styles.header}>Detalhes do Trecho</Text>
      <View style={styles.detalheCard}>
        <Text style={styles.textoDetalhe}><Text style={styles.bold}>Rodovia:</Text> {trecho.rodovia}</Text>
        <Text style={styles.textoDetalhe}><Text style={styles.bold}>KM:</Text> {trecho.km}</Text>
        <Text style={styles.textoDetalhe}><Text style={styles.bold}>Risco:</Text> {trecho.risco.toUpperCase()}</Text>
        <Text style={styles.textoDetalhe}><Text style={styles.bold}>Fatores Identificados:</Text> {trecho.fatorRisco}</Text>
        <Text style={styles.textoDetalhe}><Text style={styles.bold}>Data:</Text> {trecho.dataRegistro}</Text>
      </View>
      <Button title="Voltar para Lista" onPress={() => setTelaAtual("lista")} />
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  detalheCard: { backgroundColor: '#fff', padding: 20, borderRadius: 10, marginBottom: 20, elevation: 2 },
  textoDetalhe: { fontSize: 16, marginBottom: 10 },
  bold: { fontWeight: 'bold' }
});
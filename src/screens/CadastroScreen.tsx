import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ocorrencia } from '../types';

type Props = {
  trechos: Ocorrencia[];
  setTrechos: (trechos: Ocorrencia[]) => void;
  setTelaAtual: (tela: "lista" | "cadastro" | "detalhe") => void;
};

export default function CadastroScreen({ trechos, setTrechos, setTelaAtual }: Props) {
  const [rodovia, setRodovia] = useState('');
  const [km, setKm] = useState('');
  const [fatorRisco, setFatorRisco] = useState('');
  const [risco, setRisco] = useState<"baixo" | "medio" | "alto">("baixo");

  const salvarTrecho = () => {
    const novoTrecho: Ocorrencia = {
      id: Math.random().toString(),
      rodovia,
      km,
      fatorRisco,
      risco,
      dataRegistro: new Date().toLocaleDateString('pt-BR'),
    };
    setTrechos([...trechos, novoTrecho]);
    setTelaAtual("lista");
  };

  return (
    <View style={styles.tela}>
      <Text style={styles.header}>Registrar Novo Trecho</Text>
      <TextInput style={styles.input} placeholder="Rodovia (Ex: SP-330)" value={rodovia} onChangeText={setRodovia} />
      <TextInput style={styles.input} placeholder="KM (Ex: 140)" value={km} onChangeText={setKm} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Fator de Risco (Ex: Curva)" value={fatorRisco} onChangeText={setFatorRisco} />
      
      <Text style={{ marginTop: 10, fontWeight: 'bold' }}>Nível de Risco:</Text>
      <View style={styles.botoesRisco}>
        <Button title="Baixo" color={risco === 'baixo' ? 'green' : 'gray'} onPress={() => setRisco('baixo')} />
        <Button title="Médio" color={risco === 'medio' ? 'orange' : 'gray'} onPress={() => setRisco('medio')} />
        <Button title="Alto" color={risco === 'alto' ? 'red' : 'gray'} onPress={() => setRisco('alto')} />
      </View>

      <View style={{ marginTop: 20 }}>
        <Button title="Salvar Trecho" onPress={salvarTrecho} />
      </View>
      <View style={{ marginTop: 10 }}>
        <Button title="Cancelar" color="red" onPress={() => setTelaAtual("lista")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: '#fff', padding: 10, marginVertical: 5, borderRadius: 5, borderWidth: 1, borderColor: '#ccc' },
  botoesRisco: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
});
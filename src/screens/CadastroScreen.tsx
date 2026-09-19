import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Ocorrencia } from '../types';
import { storageService } from '../services';

type Props = {
  onOcorrenciaSalva: (novasOcorrencias: Ocorrencia[]) => void;
  setTelaAtual: (tela: "lista" | "cadastro" | "detalhe") => void;
};

export default function CadastroScreen({ onOcorrenciaSalva, setTelaAtual }: Props) {
  const [rodovia, setRodovia] = useState('');
  const [km, setKm] = useState('');
  const [descricao, setDescricao] = useState('');
  const [risco, setRisco] = useState<"baixo" | "medio" | "alto">("baixo");
  const [salvando, setSalvando] = useState(false);

  const handleSalvar = async () => {
    if (!rodovia.trim() || !km.trim() || !descricao.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos antes de salvar.');
      return;
    }

    setSalvando(true);
    try {
      const dataAtual = new Date();
      const dia = String(dataAtual.getDate()).padStart(2, '0');
      const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
      const ano = dataAtual.getFullYear();

      const novaOcorrencia: Ocorrencia = {
        id: Date.now().toString(),
        rodovia,
        km,
        local: `${rodovia.toUpperCase()} - KM ${km}`,
        descricao,
        risco,
        data: `${dia}/${mes}/${ano}`,
      };

      const listaAtualizada = await storageService.saveOcorrencia(novaOcorrencia);
      onOcorrenciaSalva(listaAtualizada);
      setTelaAtual("lista");
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a ocorrência localmente.');
    } finally {
      setSalvando(false);
    }
  };

  return (
    <View style={styles.tela}>
      <Text style={styles.header}>Cadastrar Ocorrência</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Rodovia (Ex: SP-330)" 
        value={rodovia} 
        onChangeText={setRodovia} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="KM (Ex: 122)" 
        value={km} 
        onChangeText={setKm} 
        keyboardType="numeric" 
      />
      <TextInput 
        style={[styles.input, styles.textArea]} 
        placeholder="Descrição do Risco (Ex: Placa encoberta)" 
        value={descricao} 
        onChangeText={setDescricao} 
        multiline 
      />
      
      <Text style={styles.label}>Nível de Risco:</Text>
      <View style={styles.botoesRisco}>
        <Button title="Baixo" color={risco === 'baixo' ? '#388E3C' : 'gray'} onPress={() => setRisco('baixo')} />
        <Button title="Médio" color={risco === 'medio' ? '#F57C00' : 'gray'} onPress={() => setRisco('medio')} />
        <Button title="Alto" color={risco === 'alto' ? '#D32F2F' : 'gray'} onPress={() => setRisco('alto')} />
      </View>

      {salvando ? (
        <ActivityIndicator size="large" color="#1E88E5" style={{ marginTop: 20 }} />
      ) : (
        <View style={styles.acoes}>
          <Button title="Salvar Ocorrência" onPress={handleSalvar} color="#1E88E5" />
          <View style={{ marginTop: 10 }}>
            <Button title="Cancelar" color="#757575" onPress={() => setTelaAtual("lista")} />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: '#fff', padding: 12, marginVertical: 6, borderRadius: 6, borderWidth: 1, borderColor: '#ccc' },
  textArea: { height: 80, textAlignVertical: 'top' },
  label: { marginTop: 12, fontWeight: 'bold', fontSize: 14 },
  botoesRisco: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 12 },
  acoes: { marginTop: 20 }
});
import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ocorrencia } from './src/types';
import { storageService } from './src/services';
import { ListaScreen, CadastroScreen, DetalheScreen } from './src/screens';

export default function App() {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [telaAtual, setTelaAtual] = useState<"lista" | "cadastro" | "detalhe">("lista");
  const [ocorrenciaSelecionada, setOcorrenciaSelecionada] = useState<Ocorrencia | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      const dadosSalvos = await storageService.getOcorrencias();
      setOcorrencias(dadosSalvos);
      setCarregando(false);
    }
    carregarDados();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {carregando ? (
          <View style={styles.centralizado}>
            <ActivityIndicator size="large" color="#1E88E5" />
          </View>
        ) : (
          <>
            {telaAtual === "lista" && (
              <ListaScreen 
                ocorrencias={ocorrencias} 
                setTelaAtual={setTelaAtual} 
                setOcorrenciaSelecionada={setOcorrenciaSelecionada} 
              />
            )}

            {telaAtual === "cadastro" && (
              <CadastroScreen 
                onOcorrenciaSalva={(novas) => setOcorrencias(novas)} 
                setTelaAtual={setTelaAtual} 
              />
            )}

            {telaAtual === "detalhe" && ocorrenciaSelecionada && (
              <DetalheScreen 
                ocorrencia={ocorrenciaSelecionada} 
                setTelaAtual={setTelaAtual} 
              />
            )}
          </>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', paddingHorizontal: 16, paddingTop: 10 },
  centralizado: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});
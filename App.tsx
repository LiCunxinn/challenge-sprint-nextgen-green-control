import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { mockTrechos } from './src/data/mock';
import { Ocorrencia } from './src/types';

// Importando as telas componentizadas da pasta screens
import { CadastroScreen, DetalheScreen, ListaScreen } from './src/screens';

export default function App() {
  // Estado Global do App
  const [trechos, setTrechos] = useState<Ocorrencia[]>(mockTrechos);
  const [telaAtual, setTelaAtual] = useState<"lista" | "cadastro" | "detalhe">("lista");
  const [trechoSelecionado, setTrechoSelecionado] = useState<Ocorrencia | null>(null);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {telaAtual === "lista" && (
          <ListaScreen 
            trechos={trechos} 
            setTelaAtual={setTelaAtual} 
            setTrechoSelecionado={setTrechoSelecionado} 
          />
        )}

        {telaAtual === "cadastro" && (
          <CadastroScreen 
            trechos={trechos} 
            setTrechos={setTrechos} 
            setTelaAtual={setTelaAtual} 
          />
        )}

        {telaAtual === "detalhe" && trechoSelecionado && (
          <DetalheScreen 
            trecho={trechoSelecionado} 
            setTelaAtual={setTelaAtual} 
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20, paddingTop: 50 },
});
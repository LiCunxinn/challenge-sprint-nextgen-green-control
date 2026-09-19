# Sistema de Automação de Rotas e Monitoramento Preditivo de Vegetação Rodoviária (Motiva)

## O Problema
Atualmente, o monitoramento do crescimento da vegetação nas rodovias é realizado pela Motiva de forma analógica e ineficiente. Os níveis de vegetação são coletados física e visualmente por operadores em campo e consolidados manualmente em planilhas. A partir desses dados estáticos, o supervisor precisa analisar linha por linha e mapear as rotas de alta prioridade para despachar as equipes de roçada. 

Esse processo gera os seguintes impactos:
* **Alta Carga Cognitiva e Erro Humano:** O supervisor precisa cruzar dados visuais sem precisão matemática em tempo real.
* **Logística Fragmentada:** Dificuldade em agrupar trechos próximos de forma eficiente, gerando alto tempo ocioso e desperdício de combustível.
* **Riscos à Segurança Viária:** A demora na tomada de decisão manual pode fazer com que pontos críticos (vegetação cobrindo placas ou reduzindo visibilidade em curvas) demorem a receber manutenção.

---

## Os Usuários do App
* **Supervisor de Operações (Web/Mobile):** Consome o painel automatizado, visualiza os clusters de criticidade gerados pelo sistema e valida o despacho das rotas otimizadas.
* **Equipe de Campo (Mobile):** Recebe diretamente no aplicativo a lista e os detalhes das ocorrências registradas para atuação rápida em trechos de risco.

---

## Principal Ação do App
Automatizar o mapeamento e o registro de trechos críticos de vegetação e fatores de risco rodoviário, permitindo criar, consultar e detalhar ocorrências com dados persistidos localmente no dispositivo.

---

## Escopo e Funcionalidades da Sprint 3 (App Persistente - MVP Consolidado)

Nesta sprint, o aplicativo deixa de ser uma simulação volátil em memória. O fluxo funciona de ponta a ponta com dados que **sobrevivem ao fechar e reabrir o app**:

1. **Listagem de Ocorrências:** Exibe os trechos de risco salvos no dispositivo. Cada item é renderizado através do componente `OcorrenciaCard`, que exibe claramente a classificação de risco (**baixo**, **médio** e **alto**) com badges coloridos.
2. **Cadastro de Ocorrência:** Formulário funcional para registrar novos pontos de risco (rodovia, KM, descrição e classificação de risco). Ao salvar, os dados são armazenados localmente e incorporados à lista sem a necessidade de reiniciar o aplicativo.
3. **Detalhes da Ocorrência:** Tela dedicada que exibe as informações completas do trecho selecionado na lista, incluindo o nível de risco visível e a descrição detalhada.
4. **Persistência de Dados (AsyncStorage):** Garantia de que os registros novos e antigos permanecem salvos no aplicativo mesmo após o fechamento completo da aplicação.

---

## Estrutura Técnica do Projeto

A arquitetura do projeto segue a separação rígida de responsabilidades exigida na Sprint 3. **As telas não se comunicam diretamente com o banco de dados/storage**; toda a persistência é gerenciada pela camada `services/`.

```text
challenge-sprint-nextgen-green-control/
├── src/
│   ├── components/     # Componentes visuais reutilizáveis (OcorrenciaCard.tsx)
│   │   ├── OcorrenciaCard.tsx
│   │   └── index.ts      
│   ├── data/           # Carga inicial simulada (seed data)
│   │   └── mock.ts
│   ├── screens/        # Telas que compõem o fluxo do MVP
│   │   ├── ListaScreen.tsx
│   │   ├── CadastroScreen.tsx
│   │   ├── DetalheScreen.tsx
│   │   └── index.ts
│   ├── services/       # Camada isolada de persistência (Storage)
│   │   ├── storageService.ts
│   │   └── index.ts
│   └── types/          # Tipagens globais do TypeScript (Ocorrencia)
│       └── index.ts
├── App.tsx             # Arquivo principal e gerenciador de estado global
```
---

## Como Executar o App

Este projeto foi construído utilizando React Native com o framework Expo e TypeScript.

### Pré-requisitos
* Ter o [Node.js](https://nodejs.org/) instalado em seu computador.
* Ter o aplicativo **Expo Go** instalado em seu dispositivo móvel (Android ou iOS) ou um emulador configurado.

### Passo a Passo
1. Clone o repositório em sua máquina.
2. Abra o terminal na pasta raiz do projeto.
3. Instale as dependências do projeto:
```bash
npm install
```
4. Inicie o servidos do Expo:
```bash
npx expo start
```
5. Escaneie o QR Code exibido no terminal utilizando o aplicativo **Expo Go**.

### Fluxo do Aplicativo (Ponta a Ponta)
O fluxo do MVP opera sem quebras na seguinte sequência:
1. **Criar Ocorrência:** O usuário acessa a tela de cadastro via botão `+ Nova Ocorrência`, preenche os dados (rodovia, KM, descrição e risco) e clica em salvar. O `storageService` grava o novo registro no `AsyncStorage`.
2. **Listar Ocorrências:** Ao finalizar o cadastro, o app retorna automaticamente para a tela de listagem, exibindo a nova ocorrência cadastrada no topo, atualizando o estado sem reiniciar o aplicativo.
3. **Ver Detalhe:** Ao clicar em qualquer card na lista, o usuário é direcionado para a tela de detalhe, onde visualiza o local, a data, a descrição completa e o risco (**baixo**, **médio** ou **alto**).
4. **Reabrir o App:** Ao encerrar completamente a aplicação e abri-la novamente, os dados criados permanecem carregados e visíveis na listagem.

### Persistência de Dados e Carga Inicial (Seed)
A camada de dados foi modelada utilizando o tipo TypeScript `Ocorrencia` (`src/types/index.ts`):

```ts
export type Ocorrencia = {
  id: string;
  rodovia: string;
  km: string;
  local: string;
  descricao: string;
  risco: "baixo" | "medio" | "alto";
  data: string;
};
```

### Como a Persistência Funciona
* **Camada de Serviço (`src/services/storageService.ts`):** Centraliza as funções de leitura (`getOcorrencias`) e escrita (`saveOcorrencia`) no `@react-native-async-storage/async-storage`.
* **Carga Inicial (Seed):** O arquivo `src/data/mock.ts` é utilizado **apenas na primeira inicialização do app**. Quando o `storageService` detecta que o banco local está vazio, ele popula o armazenamento com as ocorrências de teste. A partir do primeiro cadastro, o `AsyncStorage` passa a ser a fonte primária e definitiva de dados.
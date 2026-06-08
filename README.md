# Sistema de Automação de Rotas e Monitoramento Preditivo de Vegetação Rodoviária

## O Problema
Atualmente, o monitoramento do crescimento da vegetação nas rodovias é realizado pela Motiva de forma analógica e ineficiente. Os níveis de vegetação são coletados física e visualmente por operadores em campo e consolidados manualmente em planilhas de Excel. A partir desses dados estáticos, o supervisor precisa analisar linha por linha e mapear, de forma 100% manual, as rotas de alta prioridade para despachar as equipes de roçada. 

Esse processo gera os seguintes impactos:
* **Alta Carga Cognitiva e Erro Humano:** O supervisor precisa cruzar dados visuais sem precisão matemática em tempo real.
* **Logística Fragmentada:** Dificuldade em agrupar trechos próximos de forma eficiente, gerando alto tempo ocioso e desperdício de combustível nas rotas de deslocamento.
* **Riscos à Segurança Viária:** A demora na tomada de decisão manual pode fazer com que pontos críticos (vegetação cobrindo placas ou reduzindo visibilidade em curvas) demorem a receber manutenção.

---

## Os Usuários do App
* **Supervisor de Operações (Web/Mobile):** Consome o painel automatizado, visualiza os clusters de criticidade gerados pelo algoritmo e valida o despacho das rotas otimizadas.
* **Equipe de Campo (Mobile):** Recebe diretamente no aplicativo a rota ideal de trabalho já calculada, sabendo exatamente quais trechos sequenciais devem ser roçados para maximizar a eficiência do turno.

---

## Principal Ação do App
Automatizar o mapeamento e roteirização logística de trechos críticos de vegetação, transformando dados brutos de sensores e satélites em ordens de serviço com rotas otimizadas prontas para execução.

---

## Escopo e Funcionalidades da Sprint 2 (MVP Funcional)
Para fins de demonstração técnica nesta sprint e validação do fluxo, o aplicativo simula a entrada de dados (que no futuro virá de sensores/satélites) através de um fluxo funcional completo contendo:
1. **Listagem de Ocorrências (Trechos Críticos):** Visualização dos pontos que necessitam de intervenção, renderizados a partir de um estado dinâmico.
2. **Cadastro de Ocorrência:** Formulário para registrar um novo ponto de risco (rodovia, KM, fator de risco e nível de criticidade), adicionando-o à lista em tempo real.
3. **Detalhes da Ocorrência:** Tela de visualização focada nos dados específicos de um trecho selecionado na lista.

---

## Estrutura Técnica do Projeto
```text
challenge-sprint-nextgen-green-control/
├── src/
│   ├── components/       # Componentes visuais reutilizáveis
│   │   ├── OcorrenciaCard.tsx
│   │   └── index.ts      
│   ├── data/             # Dados simulados da aplicação
│   │   └── mock.ts
│   ├── screens/          # Telas que compõem o fluxo do MVP
│   │   ├── ListaScreen.tsx
│   │   ├── CadastroScreen.tsx
│   │   ├── DetalheScreen.tsx
│   │   └── index.ts
│   └── types/            # Tipagens globais do TypeScript
│       └── index.ts
├── App.tsx               # Arquivo principal e gerenciador de estado (Rotas)
```
---

## Sprint 2: Como Executar o App

Este projeto foi construído utilizando React Native com o framework Expo. Para visualizar o aplicativo rodando em sua máquina, siga os passos abaixo:

### Pré-requisitos
* Ter o [Node.js](https://nodejs.org/) instalado em seu computador.
* Ter o aplicativo **Expo Go** instalado em seu dispositivo móvel (Android ou iOS).

### Passo a Passo
1. Clone o repositório em sua máquina.
2. Abra o terminal na pasta raiz do projeto.
3. Execute o comando `npm install` para instalar todas as dependências.
4. Execute o comando `npx expo start` para iniciar o servidor do Expo.
5. Escaneie o QR Code exibido no terminal utilizando o aplicativo **Expo Go**.

### O Que o App Faz Nesta Versão (Fluxo MVP)
Através de navegação condicional controlada por estado, o app gerencia o fluxo de ponta a ponta exigido para o MVP:
* **Visualizar:** Uma lista de trechos rodoviários críticos ativos, renderizados a partir do estado de forma componentizada através do `OcorrenciaCard`.
* **Cadastrar:** Um formulário funcional para adicionar um novo ponto de risco (inserindo rodovia, KM, fatores agravantes e nível de risco). Os dados atualizam a lista dinamicamente via `useState`.
* **Detalhar:** Permite selecionar um trecho específico da lista para visualizar suas informações completas em uma tela dedicada.

### Como os Dados Estão Mockados
Atualmente, o app utiliza uma simulação de dados fixa (Array) gerenciada dinamicamente pelo `useState` no componente central (`App.tsx`) e distribuída via props para as telas mapeadas na pasta `src/screens/`. 

A tipagem das informações (`Ocorrencia`) foi configurada estritamente via TypeScript no arquivo `src/types/index.ts`, estruturando os campos essenciais (rodovia, KM, nível de risco e fatores de risco). Essa estrutura foi desenhada para servir de base para a integração definitiva com os indicadores automatizados de satélite (NDVI) e sensores analíticos nas próximas fases. Os dados iniciais de inicialização do app encontram-se isolados no arquivo `src/data/mock.ts`.
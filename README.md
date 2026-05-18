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

## Funcionalidades do App (MVP)
1. **Listagem de Rotas Automatizadas (Home):** Exibição dos clusters de trabalho gerados pelo algoritmo K-means, ordenados pelo nível de prioridade (Relevância Logística).
2. **Visualização de Detalhes da Rota:** Exibição do trajeto sequencial que a equipe deve seguir, mostrando os trechos críticos agrupados para aquele dia.
3. **Ficha de Criticidade do Trecho:** Detalhamento de um ponto específico da rota, exibindo os dados automáticos que geraram o alerta (Índice NDVI do satélite, validação do sensor IoT e multiplicadores de risco como proximidade de placas ou curvas).
4. **Status de Execução:** Permite à equipe de campo marcar os trechos da rota como "Concluídos", atualizando o sistema em tempo real.

---

## Estrutura Técnica do Projeto
O projeto foi inicializado utilizando a stack obrigatória: **React Native com Expo** e **TypeScript**.

```text
src/
├── components/       # Componentes reutilizáveis (Cards de rota, Botões de status, Mapas)
├── screens/          # Telas principais do aplicativo
│   ├── Home.tsx           # Lista de rotas/clusters gerados
│   ├── DetalheRota.tsx     # Trajeto intra-cluster e sequência de trechos
│   └── DetalheTrecho.tsx   # Dados de satélite/sensor do ponto selecionado
└── types/            # Tipagens do TypeScript (Interfaces para Rotas, Trechos, Criticidade)

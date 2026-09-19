import { Ocorrencia } from '../types';

export const mockOcorrencias: Ocorrencia[] = [
  {
    id: "1",
    rodovia: "SP-330",
    km: "122",
    local: "SP-330 - KM 122",
    descricao: "Placa Encoberta e Curva Sinuosa",
    risco: "alto",
    data: "25/10/2026",
  },
  {
    id: "2",
    rodovia: "SP-348",
    km: "45",
    local: "SP-348 - KM 45",
    descricao: "Vegetação densa próxima ao acostamento",
    risco: "medio",
    data: "26/10/2026",
  },
  {
    id: "3",
    rodovia: "SP-280",
    km: "88",
    local: "SP-280 - KM 88",
    descricao: "Crescimento uniforme em trecho reto",
    risco: "baixo",
    data: "27/10/2026",
  }
];
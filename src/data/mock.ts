import { Ocorrencia } from '../types';

export const mockTrechos: Ocorrencia[] = [
  {
    id: "1",
    rodovia: "SP-330",
    km: "122",
    risco: "alto",
    fatorRisco: "Placa Encoberta e Curva Sinuosa",
    dataRegistro: "25/05/2026",
  },
  {
    id: "2",
    rodovia: "SP-348",
    km: "45",
    risco: "medio",
    fatorRisco: "Vegetação densa próxima ao acostamento",
    dataRegistro: "26/05/2026",
  },
  {
    id: "3",
    rodovia: "SP-280",
    km: "88",
    risco: "baixo",
    fatorRisco: "Crescimento uniforme em trecho reto",
    dataRegistro: "27/05/2026",
  },
  {
    id: "4",
    rodovia: "SP-055",
    km: "210",
    risco: "alto",
    fatorRisco: "Risco de deslizamento no talude",
    dataRegistro: "28/05/2026",
  },
  {
    id: "5",
    rodovia: "SP-150",
    km: "32",
    risco: "medio",
    fatorRisco: "Placa de limite de velocidade parcialmente coberta",
    dataRegistro: "29/05/2026",
  }
];
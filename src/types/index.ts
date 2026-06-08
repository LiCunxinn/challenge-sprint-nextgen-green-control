export type Ocorrencia = {
  id: string;
  rodovia: string;
  km: string;
  risco: "baixo" | "medio" | "alto";
  fatorRisco: string;
  dataRegistro: string;
};
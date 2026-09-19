export type Ocorrencia = {
  id: string;
  rodovia: string;
  km: string;
  local: string;
  descricao: string;
  risco: "baixo" | "medio" | "alto";
  data: string;
};
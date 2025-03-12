import { Categories } from "@/@types/types";

export const categories: Categories = {
  ACESSIBILIDADE: { id: "ACESSIBILIDADE", name: "Acessibilidade", color: "#1DCBF2" },
  CULTURA: { id: "CULTURA", name: "Cultura", color: "#693E30" },
  TECNOLOGIA: { id: "TECNOLOGIA", name: "Tecnologia", color: "#3DBC9E" },
  EVENTOS: { id: "EVENTOS", name: "Eventos", color: "#255E0D" },
  ESPORTES: { id: "ESPORTES", name: "Esportes", color: "#8F4EF9" },
  ENTREVISTA: { id: "ENTREVISTA", name: "Entrevista", color: "#CC0000" },
  JUSTICAEPOLITICA: { id: "JUSTICAEPOLITICA", name: "Justiça e Política", color: "#3D4953" },
  SAUDE: { id: "SAUDE", name: "Saúde", color: "#255E0D" },
  TESTDRIVE: { id: "TESTDRIVE", name: "Test Drive", color: "#FF5C00" },
  INTERNACIONAL: { id: "INTERNACIONAL", name: "Internacional", color: "#3717FE" },
  TRABALHO: { id: "TRABALHO", name: "Trabalho", color: "#41172B" },
  ESPECIAL: { id: "ESPECIAL", name: "Especial", color: "#41172B" },
};

export function getCategoryInfo(category: keyof Categories) {
  return categories[category];
}

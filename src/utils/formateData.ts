export const formatDate = (date: string): string => {
  const parts = date.split("-");
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return `${year}-${month}-${day}`;
  } else {
    console.error("Formato de data inválido:", date);
    return date;
  }
};

export function formatDateMouth(data: string | undefined): string {
  const meses = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];

  if (data) {
    const [ano, mes, dia] = data.split("-");
    const nomeMes = meses[parseInt(mes, 10) - 1];

    return `${parseInt(dia, 10)} de ${nomeMes} de ${ano}`;
  } else {
    return "";
  }
}

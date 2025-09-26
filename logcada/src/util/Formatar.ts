
export function formataData(data: string) {
  const [date, tempo] = data.split("T") 
  const[ano, mes, dia] = date.split("-")
  const[hora, min, seg] = tempo.split(":")
  return `${dia.padStart(2,"0")}/${mes.padStart(2,"0")}/${ano.padStart(2,"0")} ${hora.padStart(2,"0")}:${min.padStart(2,"0")}`
}
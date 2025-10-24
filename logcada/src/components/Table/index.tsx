import TableItem from "./TableItem";
import Decorator from '../../assets/decorator.png'
import"./Tables.scss"
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import ComunicarCard from "../ComunicarCard";
import { useState } from "react";
interface TableProps {
  title?: string,
  headers: string[],
  campos: string[],
  itens?: Record<string, any>[],
  onNovoClick?: () => void,
  onItemClick?: (item: Record<string, any> ) => void,
  planilha?: boolean,
  comunicacao?: boolean
}

function Table({title, itens, headers, campos, onNovoClick, onItemClick, planilha, comunicacao}: TableProps) {

  const [comunicarStatus, setComunicarStatus] = useState(false);

  const handlePlanilhaClick = () => {
    if (!itens || itens.length === 0) {
      alert("Não há dados para gerar a planilha!");
      return;
    }
    const dadosParaExportar = itens.map((item) => {
      const linha: Record<string, any> = {};
      headers.forEach((header, index) => {
        const campo = campos[index];
        linha[header] = item[campo];
      });
      return linha;
    });

    const ws = XLSX.utils.json_to_sheet(dadosParaExportar);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, title || "Planilha");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, `${title || "dados"}_${new Date().toLocaleDateString("pt-BR")}.xlsx`);
  };

  const handleComunicarClick = () => {
    setComunicarStatus(true);
  }


  return (
    <section className='table'>
      <div className='title'>
        <div className="linha">
          <h2>{title}</h2>
          <div className="acoes-botoes">
            {planilha && 
              <button onClick={handlePlanilhaClick}>
                <p>
                  Gerar Planilha
                </p>
              </button>
            }
            {comunicacao &&
              <button onClick={handleComunicarClick}>
                <p>
                  Comunicar
                </p>
              </button>
            }

            <button onClick={onNovoClick}>
              <p>
                + Novo
              </p>
            </button>
          </div>
        </div>
        
        <img src={Decorator} alt='Decora título'/>
      </div>
      <div className="cabecalho" style={{ gridTemplateColumns: `repeat(${headers.length}, 1fr)` }}>
        {headers.map((header , index) => (
          <div key={index}>{header}</div>
        ))}
      </div>
      <div className="itens">
        {itens?.map((item, index) => (
          <div className="bord" key={index}>
            <TableItem onClick={() => onItemClick?.(item)} item={item} campos={campos}/>            
          </div>
        ))}
      </div>
      {comunicarStatus && 
        <div className='card-background'>
          <ComunicarCard/>
        </div>    
      }
    </section>
  )
}

export default Table
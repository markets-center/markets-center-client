import React from "react";
import s from './Paginado.module.css'
export default function Paginado({ products, setCurrent, current }){
  const pageNumbers = [];
  const pageCount = Math.ceil(products.length / 13);
  for (let i = 1; i < pageCount + 1; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className={s.paginadoContainer}>
       { current!== 1?<div>
            <button onClick={() => {current=== 1? setCurrent(current): setCurrent(current - 1)}} className={s.buttonNextPrev}>
              {'<'}
            </button>
        </div>: ""}
      {pageNumbers?.map((n) => {
        return (
          <div key={n}>
            <button onClick={() => setCurrent(n)} className={s.buttonPaginado}>
              {n}
            </button>
          </div>
        );
      })}
        { current !== pageNumbers.length?<div>
            <button onClick={() => {current=== pageNumbers.length? setCurrent(current): setCurrent(current + 1)}} className={s.buttonNextPrev}>
            {'>'}
            </button>
        </div>: ""}
    </div>
  );
};

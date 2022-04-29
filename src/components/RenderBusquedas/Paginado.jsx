import React from "react";
import s from './Paginado.module.css'
export default function Paginado({ products, setCurrent, current }){
  const pageNumbers = [];
  const pageCount = Math.ceil(products.length / 3);
  for (let i = 1; i < pageCount + 1; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className={s.paginadoContainer}>
        <div>
            <button onClick={() => {current=== 1? setCurrent(current): setCurrent(current - 1)}} >
              Prev
            </button>
        </div>
      {pageNumbers?.map((n) => {
        return (
          <div key={n}>
            <button onClick={() => setCurrent(n)}>
              {n}
            </button>
          </div>
        );
      })}
        <div>
            <button onClick={() => {current=== pageNumbers.length? setCurrent(current): setCurrent(current + 1)}} >
              Next
            </button>
        </div>
    </div>
  );
};

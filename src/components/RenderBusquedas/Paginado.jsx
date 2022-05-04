import React, { useState }  from "react";
import { useSelector } from 'react-redux';
import s from './Paginado.module.css';

export default function Paginado({ products, setCurrent, current }){

  const idSeller = useSelector(state => state.activeSeller)
  const pageNumbers = [];
  const pageCount = Math.ceil(products.length / 15);
  
  for (let i = 1; i < pageCount + 1; i++) {
    pageNumbers.push(i);
  }
  const [clicked, setClicked] = useState(1);
  const [seller, setSeller] = useState(idSeller);
  if(idSeller !== seller){
    setSeller(idSeller)
    setClicked(1);
}

  function handleClick(n){
      
      setCurrent(n);
      setClicked(n);
  }

  
  return (
    <div className={s.paginadoContainer}>
        <div className={s.divs}>
            <button onClick={() => {current=== 1? setCurrent(current): setCurrent(current - 1); {current=== 1?setClicked(current):setClicked(current - 1)}}} className={s.buttonNextPrev} >
                &laquo;
            </button>
        </div>
      {pageNumbers?.map((n) => {
        return (
          <div key={n} className={s.divs}>
            {clicked === n?<button onClick={() =>handleClick(n)} className={s.buttonPaginadoSelect} >
              {n}
            </button>:<button onClick={() => handleClick(n)} className={s.buttonPaginado} >
              {n}
            </button>}
          </div>
        );
      })}
        <div className={s.divs}>
            <button onClick={() => {current=== pageNumbers.length? setCurrent(current): setCurrent(current + 1);{current=== pageNumbers.length?setClicked(current):setClicked(current + 1)}}} className={s.buttonNextPrev}>
            &raquo;
            </button>
        </div>
    </div>
  );
};

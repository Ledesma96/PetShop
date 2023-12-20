import React from 'react'
import { useState } from 'react';

const Count = ({stock}) => {
    const [counter, setCounter] = useState (0);

    const suma = () => {
        if(counter == stock){
            return setCounter(stock)
        }
        setCounter(counter + 1)
    }

    const resta = () => {
        if(counter > 0){
            setCounter(counter - 1)
        } else {
            return setCounter(0)
        }
        
    }

  return (
    <div className='count'>
        <div className='count__div'>
            <button className='count__div__btn' onClick={resta}>-</button>
                <p className='count__div__p'>{counter}</p>
            <button className='count__div__btn' onClick={suma}>+</button>
        </div>
        <button className='count__btn'>Agregar al carrito</button>
    </div>
  )
}

export default Count
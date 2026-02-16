import React from 'react'
import { FaWindowClose } from "react-icons/fa";


export default function ShowFullItem({item, onAdd, onShowItem}) {
  return (
    <div className='full-item'>
        <div className='full-item-block'>
            <img src={'./img/'+item.img}/>
            <h2>{item.title}</h2> 
            <p>{item.desc}</p> 
            <b>{item.price}$</b> 
            <div className='add-to-cart' onClick={() => onAdd(item)}>+</div> 
            <div className='close-window' onClick={() => onShowItem(item)}>x</div>
        </div>
    </div>
  )
}

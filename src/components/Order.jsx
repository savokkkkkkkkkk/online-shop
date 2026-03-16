import React from 'react'
import { LuTrash2 } from "react-icons/lu";

export default function Order({item, onDelete}) {
  return (
    <div className='item'>
        <img src={'./img/'+item.img} alt={item.title} />
        <div className='item-info'>
          <h2>{item.title}</h2>
          <div className='item-details'>
            <b style={{marginRight: 10}}>{item.price}$</b>
            {item.cartQuantity >= 1 && (
              <span style={{fontWeight: 600}}>Количество: {item.cartQuantity}</span>
            )}
          </div>
        </div>
        <LuTrash2 className='delete-icon' onClick={() => onDelete(item.id)}/>
    </div>
  )
}
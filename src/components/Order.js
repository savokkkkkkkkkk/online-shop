import React from 'react'
import { LuTrash2 } from "react-icons/lu";

export default function Order({item, onDelete}) {
  return (
    <div className='item'>
        <img src={'./img/'+item.img} />
        <h2>{item.title}</h2> 
        <b>{item.price}$</b> 
        <LuTrash2 className='delete-icon' onClick={()=>onDelete(item.id)}/>
    </div>
  )
}


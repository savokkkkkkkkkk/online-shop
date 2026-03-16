import React, { useEffect, useState } from 'react'
import { FaWindowClose } from "react-icons/fa";


export default function ShowFullItem({item, onAdd, onShowItem, items}) {

  const [currentItem, setCurrentItem] = useState(item);
  
  useEffect(() => {
    const updatedItem = items.find(i => i.id === item.id);
    if (updatedItem) {
      setCurrentItem(updatedItem);
    }
  }, [items, item.id]);

  return (
    <div className='full-item'>
        <div className='full-item-block'>
            <img src={'./img/'+item.img}/>
            <h2>{item.title}</h2> 
            <p>{item.desc}</p> 
            <b>{item.price}$</b> 
            <p>Осталось на складе: <strong>{currentItem.quantity}</strong></p>
            <div className='add-to-cart' onClick={() => onAdd(currentItem)}>+</div> 
            <div className='close-window' onClick={() => onShowItem(item)}>x</div>
        </div>
    </div>
  )
}

import React from 'react'

export default function AddProductBtn({onAddToProducts, addToProducts}) {
  return (
    <div className='add-product'>
        <button onClick={() => onAddToProducts(addToProducts)}>Добавить товар</button>
    </div>
  )
}

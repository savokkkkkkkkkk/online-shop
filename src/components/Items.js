import React from 'react'
import Item from './Item.js'

export default function Items({items, onAdd, onShowItem, onDeleteFromItems}) {
    return (
      <main>
        {items.map(element => (
            <Item onShowItem={onShowItem} key={element.id} item={element} onAdd={onAdd} onDeleteFromItems={onDeleteFromItems}/>
        ))}
      </main>
    )
}


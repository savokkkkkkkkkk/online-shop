import React, { useState } from 'react';

export default function Categories(props) {

    const [categories] = useState([
        {
            key:  'all',
            name: 'Всё' 
        },
        {
            key:  'chairs',
            name: 'Стулья' 
        },
        {
            key:  'tables',
            name: 'Столы' 
        },
        {
            key:  'sofas',
            name: 'Диваны' 
        },
        {
            key:  'cabinets',
            name: 'Шкафы' 
        }
    ])

    return (
        <div className='categories'>
            {categories.map(el => (
                <div key={el.key} onClick={() => props.chooseCategory(el.key)}>{el.name}</div>
            ))}
        </div>
    )
}

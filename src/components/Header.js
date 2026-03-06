import React, { useState } from 'react'
import { FaShoppingCart } from "react-icons/fa";
import Order from './Order.js'

const showOrders = (props) => {
    let summa = 0
    props.orders.forEach(el => summa += Number.parseFloat(el.price))
    return (<div>
        {props.orders.map(el => (
            <Order key={el.id} item={el} onDelete={props.onDelete}/>
        ))}
        <p className='summa'>Сумма: {summa.toFixed(2)}$</p>
    </div>)
}

const showNothing = () => {
    return (<div className='empty'> 
        <h2>Корзина пуста</h2>
    </div>)
}

export default function Header(props) {
    let [cartOpen, setCartOpen] = useState(false)

    return (
        <header style={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            width: '100%',
            height: 50,
            paddingTop: 20,
            paddingBottom: 15,
            paddingRight: 30,
            paddingLeft: 30
        }}>
            <div className='nav'>
                <span className='logo'>House Staff</span>
                <ul className='nav'>
                    <li>Про нас</li>
                    <li>Контакты</li>
                    <li>Кабинет</li>
                </ul>
                <FaShoppingCart onClick={() => setCartOpen(cartOpen = !cartOpen)} className={`shop-cart-button ${cartOpen && 'active'}`}/>
                <div className='quantity-in-cart'>
                    {props.orders.length}
                </div>
                {cartOpen && (
                    <div className='shop-cart'>
                        {props.orders.length > 0 ? showOrders(props) : showNothing()}
                    </div>
                )}
            </div>
        </header>
    )
}
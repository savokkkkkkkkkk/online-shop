import React, { useState } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Items from './components/Items.jsx';
import Categories from './components/Categories.jsx';
import ShowFullItem from './components/ShowFullItem.jsx';
import AddProductForm from './components/AddProductForm.jsx';
import AddProductBtn from './components/AddProductBtn.jsx';
import {
  message
} from 'antd';

function App() {
  const [orders, setOrders] = useState([]); 
  const [items, setItems] = useState([
    {
      id: 1,
      title: 'Стул Серый',
      img: 'chair-grey.jpg',
      desc: 'Элегантный серый стул — воплощение современного комфорта и стиля. Изысканный оттенок серого придает мебели утонченный и универсальный вид, позволяющий гармонично вписаться в любой интерьер.',
      category: 'chairs',
      price: '49.99',
      quantity: '5'
    },
    {
      id: 2,
      title: 'Стул Дубовый',
      img: 'chair-oak.webp',
      desc: 'Натуральный дубовый стул с эргономичной спинкой и прочной конструкцией. Идеально подходит для кухни или столовой в скандинавском стиле.',
      category: 'chairs',
      price: '59.99',
      quantity: '3'
    },
    {
      id: 3,
      title: 'Диван Угловой Модерн',
      img: 'sofa-modern.jpg',
      desc: 'Угловой диван в современном стиле с мягкими подушками и прочным каркасом. Отличный выбор для гостиной, сочетающий комфорт и лаконичный дизайн.',
      category: 'sofas',
      price: '599.99',
      quantity: '22'
    },
    {
      id: 4,
      title: 'Кофейный столик Белый',
      img: 'coffee-table-white.jpg',
      desc: 'Минималистичный белый кофейный столик на металлических ножках. Легко сочетается с любой мебелью и добавляет света в интерьер.',
      category: 'tables',
      price: '89.99',
      quantity: '4'
    },
    {
      id: 5,
      title: 'Тумба под ТВ',
      img: 'tv-stand-graphite.webp',
      desc: 'Стильная тумба под телевизор с вместительными ящиками и закаленным стеклом. Графитовый оттенок подчеркивает современный характер интерьера.',
      category: 'cabinets',
      price: '179.99',
      quantity: '13'
    }
  ]) ;
  const [currentItems, setCurrentItems] = useState(items);
  const [showFullItem, setShowFullItem] = useState(false)
  const [fullItem, setFullItem] = useState({})
  const [addToProducts, setAddToProducts] = useState(false)

  const deleteOrder = (id) => {
    const deletedItem = orders.find(item => item.id === id);
    
    if (deletedItem) {
      const updatedItems = items.map(item => {
        if (item.id === id) {
          return { 
            ...item, 
            quantity: item.quantity + (deletedItem.cartQuantity || 1)
          };
        }
        return item;
      });
      
      setItems(updatedItems);
      setCurrentItems(updatedItems);
    }
    
    setOrders(orders.filter(item => item.id !== id));
  };

  const addToOrder = (item) => {
    if (item.quantity <= 0) {
      message.error('Товара нет в наличии.');
      return;
    }
    message.success('Товар добавлен в корзину!')
    const updatedItems = items.map(el => {
      if (el.id === item.id) {
        return { ...el, quantity: el.quantity - 1 };
      }
      return el;
    });
    
    setItems(updatedItems);
    setCurrentItems(updatedItems);

    const existingOrderIndex = orders.findIndex(el => el.id === item.id);
    
    let updatedOrders;
    if (existingOrderIndex !== -1) {
      updatedOrders = orders.map((el, index) => {
        if (index === existingOrderIndex) {
          return { 
            ...el, 
            cartQuantity: (el.cartQuantity || 1) + 1
          };
        }
        return el;
      });
    } else {
      updatedOrders = [...orders, { 
        ...item, 
        cartQuantity: 1 
      }];
    }
    
    updatedOrders.sort((item1, item2) => {
      return parseFloat(item2.price) - parseFloat(item1.price);
    });
    
    setOrders(updatedOrders);
  };

  const chooseCategory = (category) => {
    if (category === 'all') {
      setCurrentItems(items)
    } else {
      setCurrentItems(items.filter(el => el.category === category))
    }
  }

  const onShowItem = (item) => {
    const currentItem = items.find(i => i.id === item.id);
    setFullItem(currentItem || item);
    setShowFullItem(!showFullItem);
  }

  const addNewItem = (newItem) => {
    const item = {
      id: items.length+1, 
      title: newItem.title,
      category: newItem.category,
      price: newItem.price.toString(), 
      desc: newItem.desc,
      img: newItem.img || 'default.jpg',
      quantity: newItem.quantity
    };    
    console.log('Добавляем новый товар:', item);

    setItems(prevItems => {
      const updatedCurrentItems = [...prevItems, item];
      console.log('Обновленный массив currentItems:', updatedCurrentItems); 
      return updatedCurrentItems;
    });

    setCurrentItems(prevItems => {
      const updatedCurrentItems = [...prevItems, item];
      console.log('Обновленный массив currentItems:', updatedCurrentItems); 
      return updatedCurrentItems;
    });
    setAddToProducts(false);
  }

  const onAddToProducts = () => {
    setAddToProducts(!addToProducts)
  }

  const onDeleteFromItems = (item) => {
    const id = item.id
    setCurrentItems(prevItems => {
      return prevItems.filter(item => item.id !== id);
    });

    setOrders(prev => prev.filter(item => item.id !== id));

  }

  return (
    <div className='wrapper'>
      <Header orders={orders} onDelete={deleteOrder}/>
      <div id='top' className='presentation'></div>
      <Categories chooseCategory={chooseCategory}/>
      <Items onShowItem={onShowItem} items={currentItems} onAdd={addToOrder} onDeleteFromItems={onDeleteFromItems}/>
      <AddProductBtn onAddToProducts={onAddToProducts} addToProducts={addToProducts} />
      {addToProducts && <AddProductForm onAddToProducts={onAddToProducts} addToProducts={addToProducts} onAddItem={addNewItem}/>}
      {showFullItem && <ShowFullItem items={items} item={fullItem} onAdd={addToOrder} onShowItem={onShowItem} />}
      <Footer />
    </div>
  );
}

export default App;
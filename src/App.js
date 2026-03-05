import React, { useState } from 'react';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Items from './components/Items.js';
import Categories from './components/Categories.js';
import ShowFullItem from './components/ShowFullItem.js';
import AddProductForm from './components/AddProductForm.js';
import AddProductBtn from './components/AddProductBtn.js';


function App() {
  const [orders, setOrders] = useState([]); 
  const [items, setItems] = useState([
    {
      id: 1,
      title: 'Стул Серый',
      img: 'chair-grey.jpg',
      desc: 'Элегантный серый стул — воплощение современного комфорта и стиля. Изысканный оттенок серого придает мебели утонченный и универсальный вид, позволяющий гармонично вписаться в любой интерьер.',
      category: 'chairs',
      price: '49.99'
    },
    {
      id: 2,
      title: 'Стул Дубовый',
      img: 'chair-oak.webp',
      desc: 'Натуральный дубовый стул с эргономичной спинкой и прочной конструкцией. Идеально подходит для кухни или столовой в скандинавском стиле.',
      category: 'chairs',
      price: '59.99'
    },
    {
      id: 3,
      title: 'Диван Угловой Модерн',
      img: 'sofa-modern.jpg',
      desc: 'Угловой диван в современном стиле с мягкими подушками и прочным каркасом. Отличный выбор для гостиной, сочетающий комфорт и лаконичный дизайн.',
      category: 'sofas',
      price: '599.99'
    },
    {
      id: 4,
      title: 'Кофейный столик Белый',
      img: 'coffee-table-white.jpg',
      desc: 'Минималистичный белый кофейный столик на металлических ножках. Легко сочетается с любой мебелью и добавляет света в интерьер.',
      category: 'tables',
      price: '89.99'
    },
    {
      id: 5,
      title: 'Тумба под ТВ',
      img: 'tv-stand-graphite.webp',
      desc: 'Стильная тумба под телевизор с вместительными ящиками и закаленным стеклом. Графитовый оттенок подчеркивает современный характер интерьера.',
      category: 'cabinets',
      price: '179.99'
    }
  ])  ;
  const [currentItems, setCurrentItems] = useState(items);
  const [showFullItem, setShowFullItem] = useState(false)
  const [fullItem, setFullItem] = useState({})
  const [addToProducts, setAddToProducts] = useState(false)

  const deleteOrder = (id) => {
    setOrders(prev => prev.filter(item => item.id !== id));
  };

  const addToOrder = (item) => {
    let isInArray = false
    orders.forEach(el => {
      if (el.id === item.id) {
        isInArray = true
      }
    })
    if (!isInArray) {
      setOrders([...orders, item]);
    }
  };

  const chooseCategory = (category) => {
    if (category === 'all') {
      setCurrentItems(items)
    } else {
      setCurrentItems(items.filter(el => el.category === category))
    }
  }

  const onShowItem = (item) => {
    setFullItem(item)
    setShowFullItem(!showFullItem)
  }

  const addNewItem = (newItem) => {
    const item = {
      id: items.length+1, 
      title: newItem.title,
      category: newItem.category,
      price: newItem.price.toString(), 
      desc: newItem.desc,
      img: newItem.img || 'default.jpg' 
    };    
    console.log('Добавляем новый товар:', item);

    setItems(prevItems => {
      const updatedItems = [...prevItems, item];
      console.log('Обновленный массив items:', updatedItems); 
      return updatedItems;
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


  return (
    <div className='wrapper'>
      <Header orders={orders} onDelete={deleteOrder}/>
      <Categories chooseCategory={chooseCategory}/>
      <Items onShowItem={onShowItem} items={currentItems} onAdd={addToOrder} />
      <AddProductBtn onAddToProducts={onAddToProducts} addToProducts={addToProducts} />
      {addToProducts && <AddProductForm onAddToProducts={onAddToProducts} addToProducts={addToProducts} onAddItem={addNewItem}/>}
      {showFullItem && <ShowFullItem item={fullItem} onAdd={addToOrder} onShowItem={onShowItem} />}
      <Footer />
      <a href='#'>a</a>
    </div>
  );
}

export default App;
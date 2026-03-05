import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  message
} from 'antd';

const { TextArea } = Input;

// Изменяем normFile, чтобы он просто возвращал fileList
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const AddProductForm = ({ onAddToProducts, addToProducts, onAddItem }) => {
  const [form] = Form.useForm();

  // Проверяем, что onAddItem - это функция
  console.log('onAddItem type:', typeof onAddItem);

  const onFinish = (values) => {
    console.log('Получены значения из формы:', values);
    
    // Проверяем, что onAddItem существует и является функцией
    if (typeof onAddItem !== 'function') {
      console.error('onAddItem не является функцией!');
      message.error('Ошибка: функция добавления товара не найдена');
      return;
    }

    // Подготавливаем данные для отправки
    const newItem = {
      title: values.title,
      category: values.category,
      price: values.price.toString(),
      desc: values.desc,
      // Временно используем заглушку для изображения
      img: 'default.jpg' // Пока используем заглушку, пока не настроим загрузку изображений
    };

    console.log('Отправляем новый товар:', newItem);
    
    // Вызываем функцию добавления товара
    onAddItem(newItem);
    
    // Очищаем форму
    form.resetFields();
    
    // Показываем сообщение об успехе
    message.success('Товар успешно добавлен!');
    
    // Закрываем форму
    onAddToProducts(addToProducts);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Ошибка валидации:', errorInfo);
    message.error('Заполните все обязательные поля!');
  };

  const handleClose = () => {
    form.resetFields();
    onAddToProducts(addToProducts);
  };

  return (
    <div className='form-block'>
      <Form 
        className='form'
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <h2 style={{ marginBottom: 20, color: '#333' }}>Добавление нового товара</h2>
        
        <Form.Item 
          label="Название"  
          name="title" 
          rules={[{ required: true, message: 'Введите название товара' }]}
        >
          <Input placeholder="Например: Стул Серый" />
        </Form.Item>

        <Form.Item 
          label="Категория" 
          name="category"
          rules={[{ required: true, message: 'Выберите категорию' }]}
        >
          <Select 
            placeholder='Выберите категорию' 
            options={[
              { label: 'Стулья', value: 'chairs' }, 
              { label: 'Диваны', value: 'sofas' }, 
              { label: 'Столы', value: 'tables' }, 
              { label: 'Шкафы', value: 'cabinets' }
            ]} 
          />
        </Form.Item>
        
        <Form.Item 
          label="Цена" 
          name="price"
          rules={[{ required: true, message: 'Введите цену' }]}
        >
          <InputNumber 
            min={0} 
            step={0.01} 
            style={{ width: '100%' }} 
            placeholder="49.99"
          />
        </Form.Item>

        <Form.Item 
          label="Описание" 
          name="desc"
          rules={[{ required: true, message: 'Введите описание' }]}
        >
          <TextArea 
            rows={5} 
            placeholder="Подробное описание товара..."
          />
        </Form.Item>

        <Form.Item 
          label="Изображение" 
          name="image"
          valuePropName="fileList" 
          getValueFromEvent={normFile}
        >
          {/* Убираем action и добавляем beforeUpload чтобы предотвратить отправку */}
          <Upload 
            listType="picture-card"
            maxCount={1}
            beforeUpload={() => false} // Это предотвращает автоматическую отправку
            accept="image/*"
          >
            <button
              style={{ color: 'inherit', cursor: 'inherit', border: 0, background: 'none' }}
              type="button"
            >
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Загрузить</div>
            </button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit"
            style={{ marginRight: 10 }}
          >
            Добавить товар
          </Button>
          <Button 
            onClick={handleClose}
          >
            Закрыть
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProductForm;
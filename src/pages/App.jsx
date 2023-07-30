import { useEffect, useState } from 'react'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Dashboard, ProductPage, AddProduct, UpdateProductPage } from '../pages'
import Home from './Home';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
  }, [])

  const removeProduct = (id) => {
    fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE"
    }).then(() => setProducts(products.filter((item) => item.id != id)))
  }
  const addProduct = (product) => {
    fetch(`http://localhost:3000/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    })
  }
  const onUpdate = (product) => {
    fetch(`http://localhost:3000/products/${product.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    })
  }
  return (
    <>
      <Routes>
        <Route index element={<Home products={products} />} /> 
        <Route path='/admin' element={<Dashboard />} />
        <Route path='/admin/product' element={<ProductPage products={products} removeProduct={removeProduct} />} />
        <Route path='/admin/product/add' element={<AddProduct addProduct={addProduct} />} />
        <Route path='/admin/product/update/:id' element={<UpdateProductPage onUpdate={onUpdate} products={products} />} />
      </Routes>

    </>
  )
}

export default App
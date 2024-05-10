import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Homepage from './pages/Homepage.jsx'
import ProductList from './pages/Product-list.jsx'
import ProductDetail from './pages/Product-detail.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    children: [
      {
      path: '/',
      element: <Homepage></Homepage>
    },
      {
      path: '/product-list/:categoryParam',
      element: <ProductList></ProductList>
    },
      {
      path: '/product-detail/:id',
      element: <ProductDetail></ProductDetail>
    },
  ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router = {router}/>
  </React.StrictMode>,
)

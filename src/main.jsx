import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'

import Root from './routes/root.jsx'
import DishSelect from './routes/dish-select.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/dish-select",
        element: <DishSelect />
      }
    ]
  },

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
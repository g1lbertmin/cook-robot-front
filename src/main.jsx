import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'

import Root from './routes/root.jsx'
import DishSelect from './routes/dish-select.jsx'
import DishEdit from './routes/dish-edit'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainMenu from './routes/main-menu'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <MainMenu />,
      },
      {
        path: '/dish-select',
        element: <DishSelect />,
      },
      {
        path: '/dish-edit',
        element: <DishEdit />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

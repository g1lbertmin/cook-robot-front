import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'

import Root from './routes/root.jsx'
import DishSelect from './routes/dish-select.jsx'
import DishEdit from './routes/dish-edit'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainMenu from './routes/main-menu'
import RunningControl from './routes/running-control'
import OverallControl from './routes/overall-control'
import SystemSetting from './routes/system-setting'

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
        path: '/running',
        element: <RunningControl />
      },
      {
        path: '/dish-select',
        element: <DishSelect />,
      },
      {
        path: '/dish-edit',
        element: <DishEdit />,
      },
      {
        path: '/overall-control',
        element: <OverallControl />
      },
      {
        path: '/system-setting',
        element: <SystemSetting />
      }
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

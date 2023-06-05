import { useEffect, useState } from 'react'

import { Outlet } from 'react-router-dom'
import '../styles/root.scss'
import { AppBar, Toolbar, Typography } from '@mui/material'
import { Home, MoreVert } from '@mui/icons-material'

const TimeWidget = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)

    return () => {
      clearInterval(timer)
    }
  })

  return <div>{time.toLocaleTimeString()}</div>
}

export default function Root() {
  return (
    <>
      <AppBar className="appbar">
        <Toolbar className="toolbar">
          <div className="toolbar-left">
            <Home className="home-icon" />
            <Typography>Cook Robot</Typography>
          </div>
          <div>
            <Typography> 菜品选择</Typography>
          </div>
          <div className="toolbar-right">
            <TimeWidget />
            <MoreVert className="more-vert-icon" />
          </div>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  )
}

import { useEffect, useState } from 'react'

import { Outlet } from 'react-router-dom'
import '../styles/root.scss'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import { Home, MoreVert } from '@mui/icons-material'
import MySnackbar from '@/widgets/my-snackbar'
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()

  return (
    <>
      <AppBar className="appbar">
        <Toolbar className="toolbar">
          <div className="toolbar-left">
            <IconButton onClick={() => navigate('/')} className='icon-btn'>
              <Home className="home-icon" />
            </IconButton>
            <Typography>Cook Robot</Typography>
          </div>
          <div>
            <Typography>菜品选择</Typography>
          </div>
          <div className="toolbar-right">
            <TimeWidget />
            <MoreVert className="more-vert-icon" />
          </div>
        </Toolbar>
        <MySnackbar />
      </AppBar>
      <Outlet />
    </>
  )
}

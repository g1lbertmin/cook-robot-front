import { useEffect, useState } from 'react'

import { Outlet } from 'react-router-dom'
import '../styles/root.scss'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import { Home, MoreVert } from '@mui/icons-material'
import MySnackbar from '@/widgets/my-snackbar'
import { useNavigate } from 'react-router-dom'
import machineStore from '@/stores/machine-store'

const TimeWidget = () => {
  const [update] = machineStore((state) => [state.update])
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      update()
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [update])

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
            <IconButton onClick={() => navigate('/')} className="icon-btn">
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

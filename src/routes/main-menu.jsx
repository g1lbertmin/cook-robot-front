import { Button } from '@mui/material'
import '../styles/main-menu.scss'
import { useNavigate } from 'react-router-dom'

export default function MainMenu() {
  const navigate = useNavigate()
  return (
    <div className="button-wrapper">
      <Button onClick={() => navigate('running')}>运行控制</Button>
      <Button onClick={() => navigate('dish-select')}>菜品选择</Button>
      <Button>菜品制作</Button>
      <Button>全量控制</Button>
      <Button>系统设置</Button>
    </div>
  )
}

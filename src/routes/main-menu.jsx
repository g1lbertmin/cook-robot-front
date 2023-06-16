import { Button } from '@mui/material'
import '../styles/main-menu.scss'
import { useNavigate } from 'react-router-dom'

export default function MainMenu() {
  const navigate = useNavigate()

  const LargeButton = ({ children, ...rest }) => {
    return (
      <Button
        {...rest}
        sx={{ width: '41vw', height: '14vw',fontSize: 25 }}
        variant="contained"
      >
        {children}
      </Button>
    )
  }
  return (
    <div className="button-wrapper">
      <LargeButton onClick={() => navigate('running')}>运行控制</LargeButton>
      <LargeButton onClick={() => navigate('dish-select')}>菜品选择</LargeButton>
      <LargeButton onClick={() => navigate('/dish-edit')}>菜品制作</LargeButton>
      <LargeButton onClick={() => navigate('/overall-control')}>全量控制</LargeButton>
      <LargeButton>系统设置</LargeButton>
    </div>
  )
}

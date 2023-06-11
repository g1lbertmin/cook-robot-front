import '@/styles/running-control.scss'
import appStore from '../stores/app-store'
import RunningStepBar from '../widgets/running-step-bar'
import ControlPanel from '../widgets/control-panel'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function RunningControl() {
  const [selectedDish] = appStore((state) => [state.selectedDish])
  const navigate = useNavigate()
  if (selectedDish) {
    return (
      <div className="running-control-wrapper">
        <div className="placeholder"></div>
        <div className="dish-name">{selectedDish.name}</div>
        <RunningStepBar dish={selectedDish} />
        <ControlPanel />
      </div>
    )
  } else {
    return (
      <div className="running-control-wrapper">
        <div className="placeholder"></div>
        <div className="button-wrap">
          <Button
            variant="outlined"
            sx={{ fontSize: 24 }}
            onClick={() => navigate('/dish-select')}
          >
            请选择菜品
          </Button>
        </div>
      </div>
    )
  }
}

import '@/styles/running-control.scss'
import appStore from '../stores/app-store'
import RunningStepBar from '../widgets/running-step-bar'
import ControlPanel from '../widgets/control-panel'

export default function RunningControl () {
  const [selectedDish] = appStore(state => [state.selectedDish])
  return <div className="running-control-wrapper">
    <div className='placeholder'></div>
    <div className='dish-name'>{selectedDish.name}</div>
    <RunningStepBar dish={selectedDish} />
    <ControlPanel />
  </div> 
}
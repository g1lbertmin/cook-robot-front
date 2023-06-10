import { Button, CircularProgress, IconButton } from '@mui/material'
import { useEffect, useState } from 'react'
import '@/styles/control-panel.scss'
import { PlayArrow } from '@mui/icons-material'
import machineStore from '@/stores/machine-store'
import { postCommand } from '../api/command'
import { Command, createSingleInstruction } from './command'
import { secondsToMMSS } from '@/utils/time-format'
import { useNavigate } from 'react-router-dom'

export default function ControlPanel() {
  const [progress, setProgress] = useState(40)
  const [runningTime, dish, setMachineRunningState, update] = machineStore(
    (state) => [
      state.runningTime,
      state.dish,
      state.setMachineRunningState,
      state.update,
    ]
  )

  const navigate = useNavigate()

  const startBtnClick = async () => {
    const steps = dish.steps
    const multipleCommand = new Command('multiple')

    for (const key in steps) {
      for (const step of steps[key]) {
        let instruction
        switch (key) {
          case 'prepare':
            instruction = createSingleInstruction(
              'prepare',
              0,
              'on',
              0,
              step.time
            )
            break
          case 'finish':
            instruction = createSingleInstruction(
              'finish',
              0,
              'on',
              0,
              step.time
            )
            break
          case 'ingredients':
            if (step.type === 'ingredient') {
              instruction = createSingleInstruction(
                'ingredient',
                step.slot,
                'on',
                0,
                step.time
              )
            } else {
              // water
              instruction = createSingleInstruction(
                'water',
                0,
                'on',
                step.weight,
                step.time
              )
            }
            break
          case 'seasonings':
            instruction = createSingleInstruction(
              'seasoning',
              step.slot,
              'on',
              step.weight,
              step.time
            )
            break
          case 'fires':
            instruction = createSingleInstruction(
              'fire',
              0,
              'on',
              step.gear,
              step.time
            )
            break
          case 'stir_fries':
            instruction = createSingleInstruction(
              'stir_fry',
              0,
              'on',
              step.gear,
              step.time
            )
            break
          default:
            break
        }
        multipleCommand.add(instruction)
      }
    }

    try {
      multipleCommand.setId(dish.id)
      const res = await postCommand(multipleCommand.getData())
      setMachineRunningState(true)
      await update()
      console.log('control panel, startBtnClick: ', res)
    } catch (e) {
      console.log(e)
    }
  }

  const Progress = ({ progress }) => {
    return (
      <div className="progress-wrapper">
        <CircularProgress
          variant="determinate"
          value={progress}
          size="50vw"
          thickness={8}
          sx={{
            color: '#1976d2',
            position: 'absolute',
            backgroundColor: 'transparent',
            zIndex: 2,
          }}
        />
        <CircularProgress
          variant="determinate"
          value={100}
          size="50vw"
          thickness={8}
          sx={{ color: '#dddddd', position: 'absolute', zIndex: 1 }}
        />
        <IconButton
          sx={{ zIndex: 3, width: '100px', height: '100px' }}
          onClick={startBtnClick}
        >
          <PlayArrow sx={{ fontSize: '50px' }} />
        </IconButton>
      </div>
    )
  }

  useEffect(() => {
    console.log('zzz: ', dish)
  }, [dish])

  return (
    <div className="control-panel">
      <Progress progress={progress} />
      <div className="cook-time">
        {secondsToMMSS(runningTime)}/{secondsToMMSS(dish.cook_time)}
      </div>
      <div>
        <Button variant="contained" onClick={() => navigate('/dish-select')}>
          重新选择
        </Button>
      </div>
      <div className='buttons-wrapper'>
        <Button variant="contained">出菜</Button>
        <Button variant="contained">清洗</Button>
        <Button variant="contained">复位0</Button>
        <Button variant="contained">复位1</Button>
      </div>
    </div>
  )
}

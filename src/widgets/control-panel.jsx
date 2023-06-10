import { Button, CircularProgress, IconButton, Slider } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import '@/styles/control-panel.scss'
import { HourglassBottom, PlayArrow } from '@mui/icons-material'
import machineStore from '@/stores/machine-store'
import { postCommand } from '../api/command'
import { Command, createSingleInstruction } from './command'
import { secondsToMMSS } from '@/utils/time-format'
import { useNavigate } from 'react-router-dom'

export default function ControlPanel() {
  const [progress, setProgress] = useState(40)
  const [fireLevel, setFireLevel] = useState(0)
  const [
    machineData,
    runningTime,
    dish,
    isMachineRunning,
    isCookFinished,
    setMachineRunningState,
    update,
  ] = machineStore((state) => [
    state.data,
    state.runningTime,
    state.dish,
    state.isMachineRunning,
    state.isCookFinished,
    state.setMachineRunningState,
    state.update,
  ])

  const navigate = useNavigate()

  const flagRef = useRef(true)

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
        {isCookFinished ? (
          <div className="finish">完成</div>
        ) : (
          <IconButton
            sx={{ zIndex: 3, width: '100px', height: '100px' }}
            onClick={startBtnClick}
          >
            {isMachineRunning ? (
              <HourglassBottom sx={{ fontSize: '50px' }} />
            ) : (
              <PlayArrow sx={{ fontSize: '50px' }} />
            )}
          </IconButton>
        )}
      </div>
    )
  }

  useEffect(() => {
    setProgress((runningTime * 100) / dish.cook_time)
  }, [runningTime])

  const marks = [...new Array(11).keys()].map((item) => ({
    value: item,
    label: item,
  }))

  // why execute twice?
  const handleSliderClick = async (event, value) => {
    const newValue = value
    console.log('newValue: ', newValue)

    if (flagRef.current) {
      flagRef.current = false
      setTimeout(() => {
        flagRef.current = true
      }, 500)
    } else {
      return
    }

    const immediateCommand = new Command('immediate')
    console.log('value: ', value)
    const instruction = createSingleInstruction('fire', 0, 'on', value, 0)
    immediateCommand.add(instruction)
    try {
      console.log('change fire: ', immediateCommand.getData())
      const res = await postCommand(immediateCommand.getData())
      console.log('did it')
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }

  const onStopBtnClick = async () => {
    const immediateCommand = new Command('immediate')
    const instruction = createSingleInstruction('stop', 0, 'on', 0, 0)
    immediateCommand.add(instruction)
    try {
      const res = await postCommand(immediateCommand.getData())
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="control-panel">
      <Progress progress={progress} />
      <div className="cook-time">
        {secondsToMMSS(runningTime)}/{secondsToMMSS(dish.cook_time)}
      </div>
      {isMachineRunning && (
        <div>当前温度：{machineData.temperature_infrared_number}</div>
      )}
      {isMachineRunning && (
        <div className="fire-wrapper">
          <div className="fire-label">火力</div>
          <Slider
            value={machineData.temperature_target_number / 200}
            step={1}
            min={0}
            max={10}
            marks={marks}
            onChange={handleSliderClick}
          />
        </div>
      )}
      {isMachineRunning && (
        <Button
          variant="contained"
          onClick={onStopBtnClick}
          color="warning"
          sx={{ marginTop: '20px' }}
        >
          紧急停机
        </Button>
      )}
      {!isMachineRunning && (
        <div>
          <Button variant="contained" onClick={() => navigate('/dish-select')}>
            重新选择
          </Button>
        </div>
      )}
      {!isMachineRunning && (
        <div className="buttons-wrapper">
          <Button variant="contained">出菜</Button>
          <Button variant="contained">清洗</Button>
          <Button variant="contained">复位0</Button>
          <Button variant="contained">复位1</Button>
        </div>
      )}
    </div>
  )
}

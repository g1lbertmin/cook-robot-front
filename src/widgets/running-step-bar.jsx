import '@/styles/running-step-bar.scss'
import { Step, StepLabel, Stepper } from '@mui/material'
import { useEffect, useState } from 'react'
import { sortBy } from '@/utils/array'
import { cloneDeep } from 'lodash'
import { secondsToMMSS } from '@/utils/time-format'
import machineStore from '@/stores/machine-store'

export default function RunningStepBar({ dish }) {
  const [isMachineRunning, currentStepNumber, sortedDishSteps] = machineStore(
    (state) => [
      state.isMachineRunning,
      state.currentStepNumber,
      state.sortedDishSteps,
    ]
  )
  const [stepLine, setStepLine] = useState([])

  useEffect(() => {
    if (!dish) return

    const cloneSteps = cloneDeep(dish.steps)

    const line = []
    for (const key in cloneSteps) {
      if (key !== 'finish') {
        line.push(...cloneSteps[key])
      }
    }
    line.sort(sortBy('time', 1))
    const finish = cloneSteps['finish'][0]
    finish.time = line[line.length - 1].time + 10
    line.push(finish)
    setStepLine(line)

    console.log('abc: ', isMachineRunning, currentStepNumber, sortedDishSteps)
  }, [dish])

  return (
    <div className="running-step-bar-wrapper">
      <Stepper
        sx={{
          width: `${stepLine.length * 30}vw`,
          height: 200,
          backgroundColor: '#eeeeee',
          alignItems: 'center',
        }}
        alternativeLabel
      >
        {stepLine.map((step, index) => (
          <Step key={index} completed={currentStepNumber >= index}>
            <StepLabel>
              <div>{step.name}</div>
              <div>{secondsToMMSS(step.time)}</div>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  )
}

import { useState, useEffect } from 'react'
import '@/styles/step-bar.scss'
import { AddCircle } from '@mui/icons-material'
import { sortBy } from '@/utils/sort-by'

export default function StepBar({editingDish}) {

  const [stepLine, setStepLine] = useState([])
  useEffect(() => {
    console.log(editingDish)

    const steps = editingDish.steps

    const line = []
    for (const key in steps) {
      if (key !== 'finish') {
        line.push(...steps[key])
      }
    }
    line.sort(sortBy('time', 1))
    const finish = steps['finish'][0]
    finish.time = line[line.length - 1].time + 10
    line.push(finish)

    setStepLine(line)
  }, [editingDish])

  function formatSecondsToTime(seconds) {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    const formattedMinutes = String(minutes).padStart(2, '0')
    const formattedSeconds = String(remainingSeconds).padStart(2, '0')
    return `${formattedMinutes}:${formattedSeconds}`
  }

  return (
    <div className="step-bar-wrapper">
      {stepLine.map((item, index) => (
        <>
          <div className="step-wrapper" key={`${index}-step`}>
            <AddCircle className="add-circle" />
            <div className="step-content">{item.name}</div>
            <div className="step-time">{formatSecondsToTime(item.time)}</div>
          </div>
          {index !== stepLine.length - 1 && <div className="divider" key={`${index}-divider`}/>}
        </>
      ))}
    </div>
  )
}

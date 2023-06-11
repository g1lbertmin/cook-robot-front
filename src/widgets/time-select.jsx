import { useState, useEffect } from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'

import '@/styles/time-select.scss'

export default function TimeSelect({ min, setMin, sec, setSec }) {
  const [minOptions, setMinOptions] = useState([])
  const [secOptions, setSecOptions] = useState([])

  const handleMinChange = (event) => {
    setMin(event.target.value)
  }

  const handleSecChange = (event) => {
    setSec(event.target.value)
  }

  useEffect(() => {
    const minOptions = []
    const secOptions = []
    for (let i = 0; i < 61; i++) {
      minOptions.push({
        label: i < 10 ? '0' + i : String(i),
        value: i,
      })
      if (i !== 60) {
        secOptions.push({
          label: i < 10 ? '0' + i : String(i),
          value: i,
        })
      }
    }
    setMinOptions(minOptions)
    setSecOptions(secOptions)
  }, [])
  return (
    <div className="min-sec">
      <div className="label">时刻</div>
      {min !== undefined && minOptions.length !== 0 && (
        <FormControl className="form-2">
          <InputLabel className="min-label">分</InputLabel>
          <Select value={min} onChange={handleMinChange} size="small">
            {minOptions.map((item) => (
              <MenuItem value={item.value} key={item.label}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {sec !== undefined && secOptions.length !== 0 && (
        <FormControl className="form-3">
          <InputLabel className="sec-label">秒</InputLabel>
          <Select value={sec} onChange={handleSecChange} size="small">
            {secOptions.map((item) => (
              <MenuItem value={item.value} key={item.label}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </div>
  )
}

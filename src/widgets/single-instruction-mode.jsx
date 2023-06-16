import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import '@/styles/single-instruction-mode.scss'
import { useState } from 'react'
import { Command, createSingleInstruction } from './command'
import { postCommand } from '@/api/command'

export default function SingleInstructionMode() {
  const [dishBoxValue, setDishBoxValue] = useState(1)
  const [waterValue, setWaterValue] = useState('')
  const [seasoningBoxNum, setSeasoningBoxNum] = useState(1)
  const handleDishBoxValueChange = (event) => {
    setDishBoxValue(event.target.value)
  }

  const handleAddDishBox = async () => {
    let instruction = createSingleInstruction(
      'ingredient',
      dishBoxValue,
      'on',
      0,
      0
    )

    const singleCommand = new Command('single')
    try {
      singleCommand.add(instruction)
      const res = await postCommand(singleCommand.getData())
      console.log(res)
    } catch (e) {
      console.log(e.message)
    }
  }

  const handleWaterChange = (event) => {
    const inputValue = event.target.value
    if (inputValue === '') {
      setWaterValue('')
      return
    }

    const numericValue = inputValue.replace(/[^0-9]/g, '')
    const clampedValue = Math.min(Math.max(0, numericValue), 9999)
    setWaterValue(clampedValue.toString())
  }

  const handleAddWater = async () => {
    // should be number or string?
    let instruction = createSingleInstruction(
      'water',
      0,
      'on',
      Number(waterValue),
      0
    )
    const singleCommand = new Command('single')
    try {
      singleCommand.add(instruction)
      const res = await postCommand(singleCommand.getData())
      console.log(res)
    } catch (e) {
      console.log(e.message)
    }
  }

  const handleSeasoningBoxChange = (event) => {
    setSeasoningBoxNum()
  }

  return (
    <div className="single-instruction-mode">
      <FormControl className="form-control">
        <InputLabel className="input-label">菜盒</InputLabel>
        <Select
          className="select"
          size="small"
          value={dishBoxValue}
          onChange={handleDishBoxValueChange}
        >
          {[1, 2, 3, 4].map((num) => (
            <MenuItem value={num} key={num}>
              {num}
            </MenuItem>
          ))}
        </Select>
        <Button
          variant="outlined"
          onClick={handleAddDishBox}
          sx={{ ml: '5vw' }}
        >
          添加
        </Button>
      </FormControl>
      <FormControl className="form-control">
        <InputLabel className="input-label">水</InputLabel>
        <TextField
          className="text-field"
          value={waterValue}
          onChange={handleWaterChange}
          size="small"
          type="tel" // 将类型设置为 "tel"
          InputProps={{
            pattern: '[0-9]*', // 添加 pattern 属性，限制输入为数字
            inputMode: 'numeric', // 添加 inputMode 属性
            max: 9999,
            endAdornment: <InputAdornment position="end">毫升</InputAdornment>,
          }}
        ></TextField>
        <Button variant="outlined" onClick={handleAddWater} sx={{ ml: '5vw' }}>
          添加
        </Button>
      </FormControl>

      <FormControl className="form-control">
        <InputLabel className="input-label">调料盒</InputLabel>
        <div className='start-adornment'>编号(1~6液体,7~8固体)(1~8)</div>
        <Select
          className="select"
          size="small"
          value={seasoningBoxNum}
          onChange={handleSeasoningBoxChange}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <MenuItem value={num} key={num}>
              {num}
            </MenuItem>
          ))}
        </Select>
        <TextField  size="small"/>
      </FormControl>
    </div>
  )
}

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { getIngredients } from '@/api/ingredient'
import { getShapes } from '../api/ingredient'

const WEIGHT_MIN = 10,
  WEIGHT_MAX = 1000,
  WEIGHT_STEP = 10

export default function IngredientDialog({ isOpen, onClose }) {
  const [name, setName] = useState('')
  const [shape, setShape] = useState('')
  const [weight, setWeight] = useState(WEIGHT_MIN)
  const [ingredientOptions, setIngredients] = useState([])
  const [shapeOptions, setShapeOptions] = useState([])
  const [weightOptions, setWeightOptions] = useState([])
  const [slot, setSlot] = useState(1)
  const [min, setMin] = useState(0)
  const [sec, setSec] = useState(0)
  const [minOptions, setMinOptions] = useState([])
  const [secOptions, setSecOptions] = useState([])

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleShapeChange = (event) => {
    setShape(event.target.value)
  }

  const handleWeightChange = (event) => {
    setWeight(event.target.value)
  }

  const handleSlotChange = (event) => {
    setSlot(event.target.value)
  }

  useEffect(() => {
    getIngredients().then((res) => {
      console.log(res.data)
      setIngredients(res.data)
    })

    getShapes().then((res) => {
      console.log(res.data)
      setShapeOptions(res.data)
    })

    const weightOptions = []
    for (let i = WEIGHT_MIN; i < WEIGHT_MAX + 1; i += WEIGHT_STEP) {
      weightOptions.push(i)
    }
    setWeightOptions(weightOptions)

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

  const handleMinChange = (event) => {
    console.log(event.target.value)
    setMin(event.target.value)
  }

  const handleSecChange = (event) => {
    setSec(event.target.value)
  }

  const handleCancel = () => {
    onClose();
  }

  const handleSubmit = () => {
    
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className="ingredient-modal-box">
        <div className="title">添加食材</div>
        <FormControl className="form-1">
          <div className="label">种类</div>
          <Select
            value={name}
            onChange={handleNameChange}
            className="select"
            size="small"
          >
            {ingredientOptions.map((option, index) => (
              <MenuItem value={option.id} key={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="form-1">
          <div className="label">形状</div>
          <Select
            value={shape}
            onChange={handleShapeChange}
            className="select"
            size="small"
          >
            {shapeOptions.map((option, index) => (
              <MenuItem value={option.name} key={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="form-1">
          <div className="label">分量</div>
          <Select
            value={weight}
            onChange={handleWeightChange}
            className="select"
            size="small"
            endAdornment={
              <InputAdornment position="end">克（毫升）</InputAdornment>
            }
          >
            {weightOptions.map((option, index) => (
              <MenuItem value={option} key={index}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="form-1">
          <div className="label">菜盒</div>
          <RadioGroup row value={slot} onChange={handleSlotChange}>
            {[1, 2, 3, 4].map((item) => (
              <FormControlLabel
                className="form-control-label"
                value={item}
                control={<Radio size="small" />}
                label={item}
                key={item}
              />
            ))}
          </RadioGroup>
        </FormControl>
        <div className="min-sec">
          <div className="label">时刻</div>
          <FormControl className="form-2">
            <InputLabel>分</InputLabel>
            <Select value={min} onChange={handleMinChange} size="small">
              {minOptions.map((item) => (
                <MenuItem value={item.value} key={item.label}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className="form-3">
            <InputLabel>秒</InputLabel>
            <Select value={sec} onChange={handleSecChange} size="small">
              {secOptions.map((item) => (
                <MenuItem value={item.value} key={item.label}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <Button onClick={handleCancel}>取消</Button>
          <Button onClick={handleSubmit}>提交</Button>
        </div>
      </Box>
    </Modal>
  )
}

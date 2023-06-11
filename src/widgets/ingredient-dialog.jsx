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
import { getShapes } from '@/api/ingredient'
import appStore from '@/stores/app-store'
import '@/styles/ingredient-dialog.scss'
import TimeSelect from './time-select'
import { sortBy } from '@/utils/array'
import { produce } from 'immer'

const WEIGHT_MIN = 10,
  WEIGHT_MAX = 1000,
  WEIGHT_STEP = 10

export default function IngredientDialog({
  isOpen,
  setOpen,
  type,
  step,
  index,
}) {
  const [dish, setDish] = appStore((state) => [
    state.editingDish,
    state.setEditingDish,
  ])
  const [name, setName] = useState('')
  const [shape, setShape] = useState('')
  const [weight, setWeight] = useState(WEIGHT_MIN)
  const [ingredientOptions, setIngredients] = useState([])
  const [shapeOptions, setShapeOptions] = useState([])
  const [weightOptions, setWeightOptions] = useState([])
  const [slot, setSlot] = useState(1)
  const [min, setMin] = useState(0)
  const [sec, setSec] = useState(0)

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
      setIngredients(res.data)
    })

    getShapes().then((res) => {
      setShapeOptions(res.data)
    })

    const weightOptions = []
    for (let i = WEIGHT_MIN; i < WEIGHT_MAX + 1; i += WEIGHT_STEP) {
      weightOptions.push(i)
    }
    setWeightOptions(weightOptions)
  }, [])

  useEffect(() => {

    if (type === 'update') {
      setName(step.name)
      setShape(step.shape)
      setWeight(step.weight)
      setSlot(step.slot)
      setMin(Math.floor(step.time / 60))
      setSec(step.time % 60)
    }
  }, [isOpen])

  const handleCancel = () => {
    setOpen(false)
  }

  const handleSubmit = () => {
    if (type === 'create') {
      const newStep = {
        name,
        shape,
        weight,
        slot,
        time: sec * 60 + sec,
        key: Date.now(),
        type: 'ingredient',
      }
      const newDish = produce(dish, (draft) => {
        draft.steps.ingredients.push(newStep)
        draft.steps.ingredients.sort(sortBy('time', 1))
      })
      setDish(newDish)
    } else if (type === 'update') {

      const newStep = produce(step, (draft) => {
        draft.name = name
        draft.shape = shape
        draft.weight = weight
        draft.slot = slot
        draft.time = min * 60 + sec
      })

      const newDish = produce(dish, (draft) => {
        const ingredients = draft.steps.ingredients
        ingredients[index] = newStep
        ingredients.sort(sortBy('time', 1))
      })

      setDish(newDish)
    }

    setOpen(false)
  }

  return (
    <Modal open={isOpen} onClose={() => setOpen(false)}>
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
              <MenuItem value={option.name} key={option.id}>
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
        <TimeSelect min={min} setMin={setMin} sec={sec} setSec={setSec} />
        <div>
          <Button onClick={handleCancel}>取消</Button>
          <Button onClick={handleSubmit}>提交</Button>
        </div>
      </Box>
    </Modal>
  )
}

import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  MenuItem,
  Modal,
  Select,
} from '@mui/material'
import '@/styles/ingredient-water-dialog.scss'
import appStore from '@/stores/app-store'
import { useEffect, useState } from 'react'
import TimeSelect from './time-select'
import { sortBy } from '@/utils/array'
import { produce } from 'immer'
import { cloneDeep } from 'lodash'

const WEIGHT_MIN = 10,
  WEIGHT_MAX = 1000,
  WEIGHT_STEP = 10

export default function IngredientWaterDialog() {
  const [isOpen, setOpen, dish, setDish] = appStore((state) => [
    state.showIngredientWaterDialog,
    state.setShowIngredientWaterDialog,
    state.editingDish,
    state.setEditingDish,
  ])

  const [weight, setWeight] = useState(10)
  const [weightOptions, setWeightOptions] = useState([])

  const [min, setMin] = useState(0)
  const [sec, setSec] = useState(0)
  const handleSubmit = () => {
    const newStep = {
      name: '水',
      weight,
      time: min * 60 + sec,
      key: Date.now(),
      type: 'water',
    }
    const newDish = produce(dish, draft => {
      draft.steps.ingredients.push(newStep)
      draft.steps.ingredients.sort(sortBy('time', 1))
    })
    console.log('newDish: ', newDish)
    setDish(cloneDeep(newDish))
  }

  useEffect(() => {
    const weightOptions = []
    for (let i = WEIGHT_MIN; i < WEIGHT_MAX + 1; i += WEIGHT_STEP) {
      weightOptions.push(i)
    }
    setWeightOptions(weightOptions)
  }, [])

  return (
    <Modal open={isOpen} onClose={() => setOpen(false)}>
      <Box className="ingredient-water-dialog-box">
        <div className="title">添加水</div>
        <FormControl className="form-1">
          <div className="label">分量</div>
          <Select
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
            size="small"
            className="select"
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
        <TimeSelect min={min} setMin={setMin} sec={sec} setSec={setSec} />
        <div className="button-group">
          <Button
            onClick={() => setOpen(false)}
            className="cancel-button"
            size="large"
          >
            取消
          </Button>
          <Button onClick={handleSubmit} size="large">
            提交
          </Button>
        </div>
      </Box>
    </Modal>
  )
}

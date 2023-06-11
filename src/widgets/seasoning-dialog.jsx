import {
  Modal,
  Box,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  InputAdornment,
  Button,
} from '@mui/material'
import '@/styles/seasoning-dialog.scss'
import { useEffect, useState } from 'react'
import { getSeasonings } from '../api/dish'
import TimeSelect from './time-select'
import { produce } from 'immer'
import appStore from '@/stores/app-store'
import { sortBy } from '@/utils/array'

export default function SeasoningDialog({
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
  const [seasoningOptions, setSeasoningOptions] = useState([])
  const [name, setName] = useState('')
  const [weight, setWeight] = useState(0)
  const [min, setMin] = useState(0)
  const [sec, setSec] = useState(0)

  useEffect(() => {
    getSeasonings().then((res) => {
      console.log(res.data)
      setSeasoningOptions(res.data)
    })

    if (type === 'update') {
      setName(step.name)
      setWeight(step.weight)
      setMin(Math.floor(step.time / 60))
      setSec(step.time % 60)
    }
  }, [isOpen])

  const handleSeasonChange = (event) => {
    setName(event.target.value)
  }

  const weightOptions = [...new Array(20).keys()].map((i) => i + 1)

  const handleWeightChange = (event) => {
    setWeight(event.target.value)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const handleSubmit = () => {
    if (type === 'create') {
      const newStep = {
        name,
        weight,
        time: min * 60 + sec,
        key: Date.now(),
        type: 'seasoning',
      }
      const newDish = produce(dish, (draft) => {
        draft.steps.seasonings.push(newStep)
        draft.steps.seasonings.sort(sortBy('time', 1))
      })
      setDish(newDish)
    } else if (type === 'update') {
      const newStep = produce(step, (draft) => {
        draft.name = name
        draft.weight = weight
        draft.time = min * 60 + sec
      })

      const newDish = produce(dish, (draft) => {
        const seasonings = draft.steps.seasonings
        seasonings[index] = newStep
        seasonings.sort(sortBy('time', 1))
      })

      setDish(newDish)
    }

    setOpen(false)
  }

  return (
    <Modal open={isOpen} onClose={() => setOpen(false)}>
      <Box className="seasoning-modal-box">
        <div className="title">添加调料</div>

        <FormControl fullWidth sx={{ mb: '5vw' }}>
          <InputLabel>种类</InputLabel>
          <Select value={name} label="种类" onChange={handleSeasonChange}>
            {seasoningOptions.map((item, index) => (
              <MenuItem value={item.name}>{item.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: '5vw' }}>
          <InputLabel sx={{ bgcolor: 'white', width: '10vw' }}>分量</InputLabel>
          <Select
            value={weight}
            onChange={handleWeightChange}
            endAdornment={
              <InputAdornment position="end" sx={{ mr: '2vw' }}>
                克（毫升）
              </InputAdornment>
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
        <div className="button-wrap">
          <Button
            onClick={handleCancel}
            size="large"
            variant="outlined"
            sx={{ mr: '4vw', color: '#888', borderColor: '#888' }}
          >
            取消
          </Button>
          <Button onClick={handleSubmit} size="large" variant="outlined">
            提交
          </Button>
        </div>
      </Box>
    </Modal>
  )
}

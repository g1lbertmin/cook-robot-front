import { Box, Button, Modal, Slider } from '@mui/material'
import '@/styles/stir-fry-dialog.scss'
import { useEffect, useState } from 'react'
import TimeSelect from './time-select'
import { produce } from 'immer'
import appStore from '@/stores/app-store'
import { sortBy } from '@/utils/array'

export default function StirFryDialog({ isOpen, setOpen, type, step, index }) {
  const [dish, setDish] = appStore((state) => [
    state.editingDish,
    state.setEditingDish,
  ])
  const [gear, setGear] = useState(0)
  const [min, setMin] = useState(0)
  const [sec, setSec] = useState(0)

  useEffect(() => {
    if (type === 'update') {
      setGear(step.gear)
      setMin(Math.floor(step.time / 60))
      setSec(step.time % 60)
    }
  }, [])

  const handleSliderClick = (_event, value) => {
    setGear(value)
  }

  const marks = [...new Array(6).keys()].map((item) => ({
    value: item,
    label: item,
  }))

  const handleCancel = () => {
    setOpen(false)
  }

  const handleSubmit = () => {
    if (type === 'create') {
      const newStep = {
        name: `翻炒${gear}档`,
        gear,
        time: min * 60 + sec,
        key: Date.now(),
        type: 'stir_fry',
      }
      const newDish = produce(dish, (draft) => {
        draft.steps.stir_fries.push(newStep)
        draft.steps.stir_fries.sort(sortBy('time', 1))
      })
      setDish(newDish)
    } else if (type === 'update') {
      const newStep = produce(step, (draft) => {
        draft.name = `翻炒${gear}档`
        draft.gear = gear
        draft.time = min * 60 + sec
      })
      const newDish = produce(dish, (draft) => {
        const stir_fries = draft.steps.stir_fries
        stir_fries[index] = newStep
        stir_fries.sort(sortBy('time', 1))
      })
      setDish(newDish)
    }

    setOpen(false)
  }

  return (
    <Modal open={isOpen} onClose={() => setOpen(false)}>
    <Box className="stir-fry-modal-box">
      <div className="title">添加翻炒</div>
      <div className="gear-wrap">
        <div>档位</div>
        <Slider
          value={gear}
          step={1}
          min={0}
          max={5}
          onChange={handleSliderClick}
          marks={marks}
        ></Slider>
      </div>
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

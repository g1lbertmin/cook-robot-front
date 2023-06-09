import { Box, Button, Modal, TextField } from '@mui/material'
import '@/styles/dish-name-dialog.scss'
import { useEffect, useState } from 'react'
import useStore from '@/use-store'
import { createDish, updateDish } from '@/api/dish'
import { sortBy } from '@/utils/array'

export default function DishNameDialog({ isOpen, handleClose }) {
  const [editingDish, setSnackbarInfo] = useStore((state) => [
    state.editingDish,
    state.setSnackbarInfo,
  ])
  const [name, setName] = useState('')

  useEffect(() => {
    const name = editingDish.name
    if (name) {
      setName(name)
    }
  }, [])

  const handleCreateDish = async () => {
    const stepsList = []
    const steps = editingDish.steps
    for (const key in steps) {
      stepsList.push(...steps[key])
      stepsList.sort(sortBy('time', 1))
    }

    const newDish = {
      name,
      cook_time: stepsList[stepsList.length - 1].time,
      steps,
    }

    handleClose()
    const res = await createDish(newDish)

    if (res.data.success) {
      setSnackbarInfo({
        severity: 'success',
        content: '新建成功',
      })
    }
  }

  const handleUpdateDish = async () => {
    const stepsList = []
    const steps = editingDish.steps
    for (const key in steps) {
      stepsList.push(...steps[key])
      stepsList.sort(sortBy('time', 1))
    }
    const dish = {
      name,
      cook_time: stepsList[stepsList.length - 1].time,
      steps,
    }

    dish.id = editingDish.id
    dish.image = editingDish.image
    dish.is_starred = editingDish.is_starred
    dish.is_preseted = editingDish.is_preseted

    handleClose()

    const res = await updateDish(dish)

    if (res.data.success) {
      setSnackbarInfo({
        severity: 'success',
        content: '覆盖成功',
      })
    }
  }
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box className="dish-name-dialog-box">
        <div className="label">输入菜品名称</div>
        <TextField
          label="名称"
          size="small"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <div>
          <Button onClick={() => handleClose()}>取消</Button>
          <Button onClick={handleCreateDish}>新建</Button>
          <Button onClick={handleUpdateDish}>覆盖</Button>
        </div>
      </Box>
    </Modal>
  )
}

import '@/styles/dish-edit.scss'
import StepBar from '@/widgets/step-bar'
import useStore from '@/use-store'
import { Button } from '@mui/material'
import StepList from '@/widgets/step-list'
import { sortBy } from '@/utils/array'
import DishNameDialog from '@/widgets/dish-name-dialog'
import IngredientDialog from '@/widgets/ingredient-dialog'
import IngredientWaterDialog from '@/widgets/ingredient-water-dialog'
import { useState } from 'react'

export default function DishEdit() {
  const [editingDish] = useStore((state) => [state.editingDish])

  const [dishNameDialogOpen, setDishNameDialogOpen] = useState(false)
  const [showIngredientDialog, setShowIngredientDialog] = useState(false)
  const [showIngredientWaterDialog, setShowIngredientWaterDialog] =
    useState(false)

  const handleSaveSteps = () => {
    const stepsList = []
    const steps = editingDish.steps

    for (const key in steps) {
      stepsList.push(...steps[key])
      stepsList.sort(sortBy('time', 1))
    }
    if (stepsList.length === 0) {
      // notify

      // $q.notify({
      //   message: "未添加步骤",
      //   position: "top",
      //   color: "orange",
      //   timeout: 500,
      // });
      return
    }

    setDishNameDialogOpen(true)
  }

  return (
    <div className="dish-edit-wrapper">
      <StepBar editingDish={editingDish} />
      <div className="save-delete">
        <div className="dish-name">菜品名称</div>
        <div className="dish-name-value">{editingDish.name}</div>
        <div>
          <Button variant="contained" onClick={handleSaveSteps}>
            保存
          </Button>
          <Button variant="contained" color="error">
            清空
          </Button>
        </div>
      </div>
      <StepList stepName="ingredient" steps={editingDish.steps.ingredients} />
      <StepList stepName="seasoning" steps={editingDish.steps.seasonings} />
      <StepList stepName="fire" steps={editingDish.steps.fires} />
      <StepList stepName="stir_fry" steps={editingDish.steps.stir_fries} />
      <DishNameDialog
        isOpen={dishNameDialogOpen}
        handleClose={() => setDishNameDialogOpen(false)}
      />
      <IngredientDialog />
      <IngredientWaterDialog />
    </div>
  )
}

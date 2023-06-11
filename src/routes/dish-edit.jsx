import '@/styles/dish-edit.scss'
import StepBar from '@/widgets/step-bar'
import appStore from '@/stores/app-store'
import { Button } from '@mui/material'
import StepList from '@/widgets/step-list'
import { sortBy } from '@/utils/array'
import DishNameDialog from '@/widgets/dish-name-dialog'
import IngredientDialog from '@/widgets/ingredient-dialog'
import IngredientWaterDialog from '@/widgets/ingredient-water-dialog'
import { useState } from 'react'
import SeasoningDialog from '../widgets/seasoning-dialog'
import FireDialog from '../widgets/fire-dialog'
import StirFryDialog from '../widgets/stir-fry-dialog'

export default function DishEdit() {
  const [editingDish] = appStore((state) => [state.editingDish])

  const [dishNameDialogOpen, setDishNameDialogOpen] = useState(false)
  const [ingredientDialogShow, setIngredientDialogShow] = useState(false)
  const [ingredientWaterDialogShow, setIngredientWaterShow] = useState(false)
  const [seasoningDialogShow, setSeasoningDialogShow] = useState(false)
  const [fireDialogShow, setFireDialogShow] = useState(false)
  const [stirFryDialogShow, setStirFryDialogShow] = useState(false)
  // 'create' or 'update'
  const [dialogType, setDialogType] = useState('create')

  const [step, setStep] = useState(null)
  const [index, setIndex] = useState(-1)

  const handleSaveSteps = () => {
    const stepsList = []
    const steps = editingDish.steps

    for (const key in steps) {
      stepsList.push(...steps[key])
      stepsList.sort(sortBy('time', 1))
    }
    if (stepsList.length === 0) {
      return
    }

    setDishNameDialogOpen(true)
  }

  const handleShowDialog = (stepType, show, step, index) => {
    if (step !== undefined && index !== undefined) {
      setStep(step)
      setIndex(index)
    }
    switch (stepType) {
      case 'ingredient':
        setIngredientDialogShow(show)
        return
      case 'water':
        setIngredientWaterShow(show)
        return
      case 'seasoning':
        setSeasoningDialogShow(show)
        return
      case 'fire':
        setFireDialogShow(show)
        return
      case 'stir_fry':
        setStirFryDialogShow(show)
        return
    }
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
      <StepList
        stepName="ingredient"
        steps={editingDish.steps.ingredients}
        handleShowDialog={handleShowDialog}
        setType={setDialogType}
      />
      <StepList
        stepName="seasoning"
        steps={editingDish.steps.seasonings}
        handleShowDialog={handleShowDialog}
        setType={setDialogType}
      />
      <StepList
        stepName="fire"
        steps={editingDish.steps.fires}
        handleShowDialog={handleShowDialog}
        setType={setDialogType}
      />
      <StepList
        stepName="stir_fry"
        steps={editingDish.steps.stir_fries}
        handleShowDialog={handleShowDialog}
        setType={setDialogType}
      />
      <DishNameDialog
        isOpen={dishNameDialogOpen}
        handleClose={() => setDishNameDialogOpen(false)}
      />
      {ingredientDialogShow && (
        <IngredientDialog
          isOpen={ingredientDialogShow}
          setOpen={setIngredientDialogShow}
          type={dialogType}
          step={step}
          index={index}
        />
      )}
      {ingredientWaterDialogShow && (
        <IngredientWaterDialog
          isOpen={ingredientWaterDialogShow}
          setOpen={setIngredientWaterShow}
          type={dialogType}
          step={step}
          index={index}
        />
      )}
      {seasoningDialogShow && (
        <SeasoningDialog
          isOpen={seasoningDialogShow}
          setOpen={setSeasoningDialogShow}
          type={dialogType}
          step={step}
          index={index}
        />
      )}
      {fireDialogShow && (
        <FireDialog
          isOpen={fireDialogShow}
          setOpen={setFireDialogShow}
          type={dialogType}
          step={step}
          index={index}
        />
      )}
      {stirFryDialogShow && (
        <StirFryDialog
          isOpen={stirFryDialogShow}
          setOpen={setStirFryDialogShow}
          type={dialogType}
          step={step}
          index={index}
        />
      )}
    </div>
  )
}

import '@/styles/step-list.scss'
import { secondsToMMSS } from '@/utils/time-format'
import { IconButton } from '@mui/material'
import { AddCircle, WaterDrop } from '@mui/icons-material'
import appStore from '@/stores/app-store'

export default function StepList({ stepName, steps }) {
  const [setShowIngredientDialog, setShowIngredientWaterDialog] = appStore(
    (state) => [
      state.setShowIngredientDialog,
      state.setShowIngredientWaterDialog,
    ]
  )
  const stepDisplayName = (stepName) => {
    switch (stepName) {
      case 'ingredient':
        return '食材'
      case 'seasoning':
        return '调料'
      case 'fire':
        return '火力'
      case 'stir_fry':
        return '翻炒'
      default:
        return 'ERROR'
    }
  }

  const listItemDisplayName = (step) => {
    switch (stepName) {
      case 'ingredient':
        if (step.type === 'water') {
          return `${secondsToMMSS(step.time)}，${step.name}，${
            step.weight
          }克(毫升)`
        } else {
          return `${secondsToMMSS(step.time)}，${step.name}(${step.shape})，${
            step.weight
          }克，菜盒${step.slot}`
        }
      case 'seasoning':
        return `${secondsToMMSS(step.time)}，${step.name}，${
          step.weight
        }克，调料盒${step.slot}`
      case 'fire':
        return `${secondsToMMSS(step.time)}，${step.name}`
      case 'stir_fry':
        return `${secondsToMMSS(step.time)}，${step.name}`
      default:
        return 'ERROR'
    }
  }

  return (
    <div className="step-list-wrapper">
      <div className="display-name">{stepDisplayName(stepName)}</div>
      <div className="step-content">
        {steps.map((step, index) => (
          <div key={index}>{listItemDisplayName(step)}</div>
        ))}
      </div>
      <div className="step-control">
        <IconButton onClick={() => setShowIngredientDialog(true)}>
          <AddCircle />
        </IconButton>
        {stepName === 'ingredient' && (
          <IconButton onClick={() => setShowIngredientWaterDialog(true)}>
            <WaterDrop />
          </IconButton>
        )}
      </div>
    </div>
  )
}

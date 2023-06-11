import '@/styles/step-list.scss'
import { secondsToMMSS } from '@/utils/time-format'
import { IconButton } from '@mui/material'
import { AddCircle, Delete, WaterDrop } from '@mui/icons-material'
import appStore from '@/stores/app-store'
import { produce } from 'immer'

const STEP_TYPE_MAP = new Map([
  ['ingredient', 'ingredients'],
  ['seasoning', 'seasonings'],
  ['fire', 'fires'],
  ['stir_fry', 'stir_fries'],
])

export default function StepList({
  stepName,
  steps,
  handleShowDialog,
  setType,
}) {
  const [dish, setDish] = appStore((state) => [
    state.editingDish,
    state.setEditingDish,
  ])

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

  const handleClickStep = (step, index) => {
    setType('update')
    handleShowDialog(step.type, true, step, index)
  }

  const handleDelete = (index) => {
    const type = STEP_TYPE_MAP.get(stepName)
    const newDish = produce(dish, (draft) => {
      draft['steps'][type].splice(index, 1)
    })
    setDish(newDish)
  }

  return (
    <div className="step-list-wrapper">
      <div className="display-name">{stepDisplayName(stepName)}</div>
      <div className="step-content">
        {steps.map((step, index) => (
          <div className="list-item-wrap">
            <div key={index} onClick={() => handleClickStep(step, index)}>
              {listItemDisplayName(step)}
            </div>
            <IconButton onClick={() => handleDelete(index)}>
              <Delete sx={{ fontSize: '14px', color: '#aaa' }} />
            </IconButton>
          </div>
        ))}
      </div>
      <div className="step-control">
        <IconButton
          onClick={() => {
            setType('create')
            handleShowDialog(stepName, true)
          }}
        >
          <AddCircle />
        </IconButton>
        {stepName === 'ingredient' && (
          <IconButton
            onClick={() => {
              setType('create')
              handleShowDialog('water', true)
            }}
          >
            <WaterDrop sx={{ color: '#1976d2' }} />
          </IconButton>
        )}
      </div>
    </div>
  )
}

import '@/styles/dish-edit.scss'
import StepBar from '@/widgets/step-bar'
import useStore from '@/store'
import { Button } from '@mui/material'
import StepList from '@/widgets/step-list'

export default function DishEdit() {
  const [editingDish] = useStore((state) => [state.editingDish])


  return <div className="dish-edit-wrapper">
    <StepBar editingDish={editingDish}/>
    <div className='save-delete'>
      <div className='dish-name'>菜品名称</div>
      <div className='dish-name-value'>{editingDish.name}</div>
      <div>
        <Button variant='contained'>保存</Button>
        <Button variant='contained' color='error'>清空</Button>
      </div>
    </div>
    <StepList stepName="ingredient" steps={editingDish.steps.ingredients}/>
    <StepList stepName="seasoning" steps={editingDish.steps.seasonings}/>
    <StepList stepName="fire" steps={editingDish.steps.fires}/>
    <StepList stepName="stir_fry" steps={editingDish.steps.stir_fries}/>

  </div>
}

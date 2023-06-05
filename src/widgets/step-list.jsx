import useStore from '@/store'
import { useEffect } from 'react'
import '@/styles/step-list.scss'

export default function StepList() {
  const [editingDish] = useStore((state) => [state.editingDish])
  useEffect(() => {
    console.log(editingDish)
  }, [editingDish])
  return (
    <div className='timeline-wrapper'>
      <div>aaa</div>
    </div>
  )
}

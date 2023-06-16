import '@/styles/overall-control.scss'
import { Tab, Tabs } from '@mui/material'
import { useState } from 'react'
import SingleInstructionMode from '../widgets/single-instruction-mode'

export default function OverallControl() {
  // 0,1,2,3
  const [tabValue, setTabValue] = useState(0)

  const handleTabValueChange = (_event, newValue) => {
    console.log(newValue)
    setTabValue(newValue)
  }

  return (
    <div className="overall-control-wrap">
      <div className="placeholder"></div>
      <Tabs
        value={tabValue}
        onChange={handleTabValueChange}
        sx={{ width: '100vw', display: 'flex', justifyContent: 'center' }}
      >
        <Tab label="单指令模式" sx={{ p: 0 }} />
        <Tab label="多指令模式" sx={{ p: 0 }} />
        <Tab label="PLC直控" sx={{ p: 0 }} />
        <Tab label="PLC参数设置" sx={{ p: 0 }} />
      </Tabs>
      {tabValue === 0 && (
        <div>
          <SingleInstructionMode />
        </div>
      )}
    </div>
  )
}

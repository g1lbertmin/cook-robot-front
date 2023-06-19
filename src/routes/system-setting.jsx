import '@/styles/system-setting.scss'
import {
  InsertLink,
  NetworkWifi,
  Person,
  PowerSettingsNew,
  Update,
} from '@mui/icons-material'
import { Button, FormControl, InputLabel, Tab, Tabs, TextField } from '@mui/material'
import { useState } from 'react'

export default function SystemSetting() {
  const [tabValue, setTabValue] = useState(0)
  const [ipAddress, setIpAddress] = useState('')

  const handleTabChange = (_event, newValue) => {
    setTabValue(newValue)
  }

  const handleIpAddressChange = (event) => {
    setIpAddress(event.target.value)
  }

  return (
    <div className="system-setting-wrap">
      <div className="placeholder"></div>
      <div className="content">
        <Tabs value={tabValue} onChange={handleTabChange} className="tabs">
          <Tab label="用户信息" icon={<Person />} className="tab" />
          <Tab label="网络连接" icon={<NetworkWifi />} className="tab" />
          <Tab label="手机配对" icon={<InsertLink />} className="tab" />
          <Tab label="软件更新" icon={<Update />} className="tab" />
          <Tab label="关机重启" icon={<PowerSettingsNew />} className="tab" />
        </Tabs>
        {tabValue === 0 && <div>用户信息</div>}
        {tabValue === 1 && <div>网络连接</div>}
        {tabValue === 2 && (
          <div className='form-wrap'>
            <FormControl className='form'>
              <InputLabel className='label'>IP地址</InputLabel>
              <TextField
                value={ipAddress}
                onChange={handleIpAddressChange}
                variant="outlined"
              ></TextField>
              <Button variant='outlined'>确定</Button>
            </FormControl>
            
          </div>
        )}
        {tabValue === 3 && <div>软件更新</div>}
        {tabValue === 4 && <div>关机重启</div>}
      </div>
    </div>
  )
}

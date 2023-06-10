import { getRunningStatus } from '@/api/running-status'
import { ceil } from 'lodash'
import { create } from 'zustand'

const machineStore = create((set) => ({
  stopUpdateFlag: false,
  
  runningTime: 0,

  dish: {},

  setDish: (dish) =>
    set(() => ({
      dish,
    })),
  isMachineRunning: false,
  isMachineWashing: false,
  washingTime: 0,


  setMachineRunningState: (flag) => {
    set(() => ({
      isMachineRunning: flag,
      washingTime: 0,
      stopUpdateFlag: true,
    }))

    setTimeout(() => {
      set(() => ({
        stopUpdateFlag: false,
      }))
    }, 500)
  },

  update: async () => {
    if (state.stopUpdateFlag) return

    try {
      const res = await getRunningStatus()
      if (res.data.success) {
        const data = res.data.data
        if (data.id !== '00000000-0000-0000-0000-000000000000') {
        }

        if (data.machine_state === 2) {
          // 正在运行
          if (data.washing_state === 0) {
            // 非清洗
            set(() => ({
              runningTime: ceil(data.time / 10)
            }))
          } else {
            // 清洗中
            set(() => ({
              isMachineWashing: true,
              washingTime: ceil(data.time / 10),
            }))
          }
        } else {
          // 空闲
          set(() => ({
            isMachineRunning: false,
            isMachineWashing: false,
          }))

          if (data.id !== '00000000-0000-0000-0000-000000000000') {
          }
        }
      } else {
        console.log('disconnect with middle platform')
      }
    } catch (e) {
      console.log(e)
    }
  },
}))

export default machineStore

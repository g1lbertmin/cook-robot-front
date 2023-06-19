import { getRunningStatus } from '@/api/running-status'
import { ceil } from 'lodash'
import { create } from 'zustand'
import { sortBy } from '@/utils/array'

const machineStore = create((set, get) => ({
  data: {
    id: '00000000-0000-0000-0000-000000000000',
    temperature_target_number: 0,
    temperature_infrared_number: 0,
  },
  stopUpdateFlag: false,

  runningTime: 0,

  dish: {},
  sortedDishSteps: [],
  currentStepNumber: 2,

  isMachineRunning: false,
  isMachineWashing: false,
  isNewDishSelected: false,
  isCookFinished: false,
  washingTime: 0,

  setMachineRunningState: (flag) => {
    set({
      isMachineRunning: flag,
      washingTime: 0,
      stopUpdateFlag: true,
    })

    setTimeout(() => {
      set({
        stopUpdateFlag: false,
      })
    }, 500)
  },

  update: async () => {
    const state = get()
    if (state.stopUpdateFlag) return

    const setCurrentStepNumber = (runningTime) => {
      for (let i = 0; i < state.sortedDishSteps.length - 1; ++i) {
        if (
          runningTime >= state.sortedDishSteps[i].time &&
          runningTime < state.sortedDishSteps[i + 1].time
        ) {
          return i
        }
      }
      return state.sortedDishSteps.length - 1
    }

    try {
      const res = await getRunningStatus()
      if (res.data.success) {
        const data = res.data.data
        set({
          data,
        })
        if (data.id !== '00000000-0000-0000-0000-000000000000') {
        }

        if (data.machine_state === 2) {
          // 正在运行
          set(() => ({
            isNewDishSelected: false,
          }))
          if (data.washing_state === 0) {
            // 非清洗
            const currentStepNumber = setCurrentStepNumber(state.runningTime)
            set({
              isCookFinished: false,
              isMachineRunning: true,
              runningTime: ceil(data.time / 10),
              currentStepNumber,
            })
          } else {
            // 清洗中
            set({
              isMachineWashing: true,
              washingTime: ceil(data.time / 10),
            })
          }
        } else {
          // 空闲
          set({
            isMachineRunning: false,
            isMachineWashing: false,
          })

          if (data.id !== '00000000-0000-0000-0000-000000000000') {
            if (!state.isNewDishSelected) {
              set({
                isCookFinished: true,
                runningTime: state.dish.cook_time,
              })
              setCurrentStepNumber(state.runningTime)
            } else {
              set({
                isCookFinished: false,
              })
            }
          }
        }
      } else {
        console.log('disconnect with middle platform')
      }
    } catch (e) {
      console.log(e)
    }
  },
  setDish: (dish) => {
    const setSortedDishSteps = (steps) => {
      const res = []
      for (const key in steps) {
        res.push(...steps[key])
      }
      res.sort(sortBy('time', 1))
      return res
    }
    set({
      dish,
      sortedDishSteps: setSortedDishSteps(dish.steps),
      currentStepNumber: 0,
      isNewDishSelected: true,
      isCookFinished: false,
      runningTime: 0,
      washingTime: 0,
    })
  },
  setMachineWashState: (status) => {
    set({
      isMachineWashing: status,
      washingTime: 0,
      stopUpdateFlag: true,
    })

    setTimeout(() => {
      set({ stopUpdateFlag: false })
    }, 500)
  },
}))

export default machineStore

import { create } from 'zustand'
import { getDish } from '@/api/dish'

const appStore = create((set, get) => ({
  editingDish: null,
  setEditingDish: (dish) => {
    set({ editingDish: dish })
  },

  updateDishInfo: async (type = 'update', id) => {
    const state = get()
    if (type === 'update') {
      getDish(state.editingDish.id).then((res) => {
        state.setEditingDish(res.data)
      })
    } else if (type === 'create') {
      getDish(id).then((res) => {
        state.setEditingDish(res.data)
      })
    }
  },

  selectedDish: null,
  setSelectedDish: (dish) => {
    set({ selectedDish: dish })
  },

  snackbarOpen: false,
  snackbarInfo: {
    severity: 'err',
    content: '',
  },
  closeSnackbar: () => {
    console.log('close snackbar.')
    set({
      snackbarOpen: false,
      snackbarInfo: {
        severity: 'err',
        content: '',
      },
    })
  },
  setSnackbarInfo: (info) => {
    set({
      snackbarOpen: true,
      snackbarInfo: info,
    })
  },
}))

export default appStore

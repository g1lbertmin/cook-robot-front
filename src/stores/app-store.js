import { create } from 'zustand'

const appStore = create((set) => ({
  editingDish: null,
  setEditingDish: (dish) => {
    set({ editingDish: dish })
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

  showIngredientDialog: false,
  setShowIngredientDialog: (show) => {
    set({
      showIngredientDialog: show,
    })
  },

  showIngredientWaterDialog: false,
  setShowIngredientWaterDialog: (show) => {
    set({
      showIngredientWaterDialog: show,
    })
  },
}))

export default appStore

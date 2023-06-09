import { create } from 'zustand'

const useStore = create((set) => ({
  editingDish: null,
  setEditingDish: (dish) => {
    set({ editingDish: dish })
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

export default useStore

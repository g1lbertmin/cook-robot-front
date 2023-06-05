import { create } from 'zustand'

const useStore = create((set) => ({
  editingDish: null,
  setEditingDish: (dish) => {
    set({ editingDish: dish })
  },
}))

export default useStore

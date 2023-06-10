import { Alert, Snackbar } from '@mui/material'
import appStore from '@/stores/app-store'

export default function MySnackbar() {
  const [snackbarOpen, snackbarInfo, closeSnackbar] = appStore((state) => [
    state.snackbarOpen,
    state.snackbarInfo,
    state.closeSnackbar,
  ])


  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={snackbarOpen}
      autoHideDuration={500}
      onClose={closeSnackbar}
    >
      <Alert>{snackbarInfo.content}</Alert>
    </Snackbar>
  )
}

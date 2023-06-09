import { Alert, Snackbar } from '@mui/material'
import useStore from '@/use-store'

export default function MySnackbar() {
  const [snackbarOpen, snackbarInfo, closeSnackbar] = useStore((state) => [
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

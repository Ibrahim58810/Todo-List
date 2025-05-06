import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface SnackbarTypes {
  open: boolean
  message: string
}

export default function MySnackbar({open , message}: SnackbarTypes) {

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} >
        <Alert
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

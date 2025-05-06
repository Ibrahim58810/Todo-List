import './App.css'
import TodoList from './Component/TodoList'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import  TodosReducerProvider  from './Component/context/TodosContext';
import { SnackbarProvider } from './Component/context/SnackbarProvider';


const theme = createTheme({
  palette: {
    primary: {
      main: '#4e342e',
    },
    secondary: {
      main: '#f44336',
    },
  },
  typography: {
    fontFamily: "Roboto"
  }
});


function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <TodosReducerProvider>
          <SnackbarProvider>
            <div className='main-div'>
              <TodoList />
            </div>
          </SnackbarProvider>
        </TodosReducerProvider>
      </ThemeProvider>
    </>
  )
}

export default App

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useContext, useEffect, useState } from 'react';
import { TodosContext } from './context/TodosContext';
import { SnackbarContext } from "./context/SnackbarContext";


export default function AddTodo() {
  const showAndDeleteSnackbar = useContext(SnackbarContext)
  const [inputValue, setInputValue] = useState("")
  const { dispatch} = useContext(TodosContext)
  function handleTextFieldChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputText = event.target.value
    setInputValue(inputText)
  }
  function handleAddClick() {
    if (inputValue.trim() !== "") {
      dispatch({
        type: "added",
        payLoad: {titleInput: inputValue}
      })
    }
    setInputValue("")
    showAndDeleteSnackbar("Great! Your new task is added.")
  }
  function handleEnterClick(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleAddClick()
    }
  }
  useEffect(() => {
    dispatch({ type: "effect", payLoad: {} })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <>
      <div className="add-buttons">
        <Stack direction="row" spacing={2} >
          <TextField onKeyDown={handleEnterClick} style={{ width: "80%" }} spellCheck={false} label="Task Header" value={inputValue} onChange={handleTextFieldChange} variant="outlined" />
          <Button disabled={inputValue ? false : true} style={{ width: "20%" }} variant="contained" onClick={handleAddClick} color="error">Add</Button>
        </Stack>
      </div>
    </>
  )
}
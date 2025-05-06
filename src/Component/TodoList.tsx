import MyTodo from "./MyTodo"
import AddTodo from "./AddTodo";
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Container from '@mui/material/Container';
import { useContext, useMemo, useState } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { SnackbarContext } from "./context/SnackbarContext";
import { TodosContext } from "./context/TodosContext";

type Todo = {
  id: string,
  title: string,
  info: string,
  isDone: boolean
}


export default function TodoList() {
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [todoToDelete, setTodoToDelete] = useState<Todo>({ id: "", title: '', info: "", isDone: false })
  const [todoToEdit, setTodoToEdit] = useState<Todo>({ id: "", title: '', info: "", isDone: false })
  const [buttonGroupChange, setButtonGroupChange] = useState("all")
  const [titleFieldValue, setTitleFieldValue] = useState("")
  const [infoFieldValue, setInfoFieldValue] = useState("")

  const { todos, dispatch } = useContext(TodosContext)

  const showAndDeleteSnackbar = useContext(SnackbarContext)

  const myTodos = useMemo(() => {
    if (buttonGroupChange === "all") {
      return todos
    } else if (buttonGroupChange === "pending") {
      return todos.filter(t => !t.isDone)
    } else {
      return todos.filter(t => t.isDone)
    }
  }, [todos, buttonGroupChange])
  function handleButtonGroupChange(newValue: string) {
    if (newValue !== null) setButtonGroupChange(newValue)
  }
  const showTodos = myTodos.length === 0 ? <h2 style={{
    color: "#757575",
    marginTop: "2rem",
    marginBottom: "2rem",
  }}>Enter A Task</h2> : myTodos.map(t => {
    return <MyTodo key={t.id} todo={t} showDeleteDialog={showDeleteDialog} showEditDialog={showEditDialog} />
  })
  function showDeleteDialog(todo: Todo) {
    setTodoToDelete(todo)
    setOpenDeleteDialog(true)
  }

  function handleDeleteClick() {
    dispatch({
      type: "deleted",
      payLoad: { id: todoToDelete.id }
    })
    setOpenDeleteDialog(false)
    showAndDeleteSnackbar("Task removed from your list.")
  }
  function handleDeleteEnterClick(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleDeleteClick()
      event.preventDefault()
    }
  }
  function showEditDialog(todo: Todo) {
    setTodoToEdit(todo)
    setTitleFieldValue(todo.title);
    setInfoFieldValue(todo.info);
    setOpenEditDialog(true)
  }
  function handleEditButtonClick() {
    dispatch({
      type: "edited",
      payLoad: { id: todoToEdit.id, titleInput: titleFieldValue, infoInput: infoFieldValue }
    })
    setOpenEditDialog(false)
    showAndDeleteSnackbar("Changes saved!")
  }

  function handleEditEnterClick(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleEditButtonClick()
      event.preventDefault()
    }
  }
  return (
    <>
      {/* delete dialog */}
      <Dialog
        open={openDeleteDialog}
        onKeyDown={handleDeleteEnterClick}
        onClose={() => setOpenDeleteDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{ fontWeight: "bold" }}>
          Are you sure you want to delete this task?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You cannot undo this deletion once confirmed.
          </DialogContentText>
        </DialogContent>
        <DialogActions >
          <Button onClick={() => setOpenDeleteDialog(false)} style={{ color: 'red' }}>Cancel</Button>
          <Button onClick={() => handleDeleteClick()} style={{ color: 'red' }} autoFocus>
            Yes, delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* end delete dialog */}
      {/* Edit Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        onKeyDown={handleEditEnterClick}
      >
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            className='edit-input'
            autoFocus
            margin="normal"
            label="Title"
            fullWidth
            variant="standard"
            spellCheck={false}
            value={titleFieldValue}
            onChange={(e) => e.target.value !== "" ? setTitleFieldValue(e.target.value) : setTitleFieldValue("")}
          />
          <TextField
            className='edit-input'
            margin="normal"
            label="Details"
            fullWidth
            variant="standard"
            spellCheck={false}
            value={infoFieldValue}
            onChange={(e) => e.target.value !== "" ? setInfoFieldValue(e.target.value) : setInfoFieldValue("")}
          />
        </DialogContent>
        <DialogActions>
          <Button style={{ color: "red" }} onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button style={{ color: "red" }} onClick={handleEditButtonClick}>Edit</Button>
        </DialogActions>
      </Dialog>
      {/* end Edit Dialog */}
      <Container maxWidth="sm">
        <div className="todolist-div">
          <h1>My Tasks</h1>
          <List>
            <Divider component="li" />
          </List>
          <div className="button-group">
            <ToggleButtonGroup
              value={buttonGroupChange}
              exclusive
              onChange={(_, newValue) => handleButtonGroupChange(newValue)}
              aria-label="text alignment"
            >
              <ToggleButton value="all" aria-label="left aligned">
                All
              </ToggleButton>
              <ToggleButton value="completed" aria-label="centered">
                Completed
              </ToggleButton>
              <ToggleButton value="pending" aria-label="right aligned">
                Pending
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <div style={{ maxHeight: "400px", overflowY: 'scroll', }}>
            {showTodos}
          </div>
          <AddTodo />
        </div>
      </Container>
    </>
  )
}
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CreateIcon from '@mui/icons-material/Create';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { TodosContext } from './context/TodosContext';
import { useContext } from 'react';
import { SnackbarContext } from "./context/SnackbarContext";


type Todo = {
  id: string,
  title: string,
  info: string,
  isDone: boolean
}
interface myTodoProps {
  todo: Todo,
  showDeleteDialog: (todo: Todo) => void
  showEditDialog: (todo: Todo) => void
}
export default function MyTodo({ todo, showDeleteDialog, showEditDialog }: myTodoProps) {
  const { dispatch } = useContext(TodosContext)
  const showAndDeleteSnackbar = useContext(SnackbarContext)
  function handleCheckClick(id: string) {
    dispatch({
      type: "check" , 
      payLoad: {id: id}
    })
    if (!todo.isDone) {
      showAndDeleteSnackbar("Nice! You finished a task.")
    } else {
      showAndDeleteSnackbar("Task moved back to pending.")
    }
  }


  function handleDeleteIconClick() {
    showDeleteDialog(todo)
  }
  function handleEditIconClick() {
    showEditDialog(todo)
  }

  return (
    <>
      <div className='mytodo' key={todo.id}>
        <div className="mytodo-info">
          <h2
            style={
              {
                textDecoration: todo.isDone ? "line-through" : "",
                textDecorationThickness: todo.isDone ? "3px" : "",
                textDecorationColor: todo.isDone ? "black" : ""
              }}>{todo.title}</h2>
          <p>{todo.info}</p>
        </div>
        <div className='mytodo-icon'>
          <button onClick={handleDeleteIconClick}>
            <DeleteOutlineOutlinedIcon />
          </button>
          <button onClick={handleEditIconClick}>
            <CreateIcon />
          </button>
          <button
            onClick={() => handleCheckClick(todo.id)}>
            <CheckOutlinedIcon style={{ color: todo.isDone ? "white" : "", background: todo.isDone ? "#2be02b" : "" }} />
          </button>
        </div>
      </div>
    </>
  );

}
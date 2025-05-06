import { v4 as uuidv4 } from "uuid"

type Todo = {
  id: string,
  title: string,
  info: string,
  isDone: boolean
}

interface Action {
  type: string , payLoad: {titleInput?: string , id?: string , infoInput?: string}
}

export default function TodosReducer(currentTodos: Todo[], action: Action) {

  switch (action.type) {
    case "added": {
      const newTodo = { title: action.payLoad.titleInput ?? "", id: uuidv4(), isDone: false, info: "" }
      const addedTodos = [...currentTodos, newTodo]
      localStorage.setItem("todos", JSON.stringify(addedTodos))
      return addedTodos
    } 
    case "deleted" : {
      const newTodos = currentTodos.filter(t => t.id !== action.payLoad.id)
      localStorage.setItem("todos", JSON.stringify(newTodos))
      return newTodos
    }
    case "edited": {
      const newTodos = currentTodos.map(t => {
        if (t.id === action.payLoad.id) {
          return { ...t, title: action.payLoad.titleInput ?? "", info: action.payLoad.infoInput ?? "" }
        }
        return t
      })
      localStorage.setItem("todos", JSON.stringify(newTodos))
      return newTodos
    }
    case "check" : {
      const newTodos = currentTodos.map(t =>
        t.id === action.payLoad.id ? { ...t, isDone: !t.isDone } : t
      )
      localStorage.setItem("todos", JSON.stringify(newTodos))
      return newTodos
    }
    case "effect" : {
      const savedTodos = localStorage.getItem("todos")
      if (savedTodos) {
        return JSON.parse(savedTodos)
      } else return currentTodos
    }
    default :
    return currentTodos
  }
}
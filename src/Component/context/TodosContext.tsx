/* eslint-disable react-refresh/only-export-components */

import { createContext, Dispatch, ReactNode, useReducer } from "react";
import TodosReducer from "../../reducers/todosReducer";
interface Todo {
  id: string;
  title: string;
  info: string;
  isDone: boolean;
}
type Action = {
  type: string,
  payLoad: {
    titleInput?: string;
    infoInput?: string;
    id?: string;
  }
}
type TodosContextType = {
  todos: Todo[];
  dispatch: Dispatch<Action>
};
interface child {
  children: ReactNode
}

export const TodosContext = createContext<TodosContextType>({
  todos: [],
  dispatch: () => {}
});
const TodosReducerProvider = ({ children }: child) => {
  const [todos, dispatch] = useReducer(TodosReducer, [])
  return (
    <TodosContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodosContext.Provider>
  )
}
export default TodosReducerProvider
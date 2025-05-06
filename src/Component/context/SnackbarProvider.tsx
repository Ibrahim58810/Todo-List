import { ReactNode } from "react";
import { useState } from "react";
import MySnackbar from "../MySnackbar";
import { SnackbarContext } from "./SnackbarContext";

interface child {
  children: ReactNode
}

export const SnackbarProvider = ({ children }: child) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("")
    function showAndDeleteSnackbar(message: string) {
      setOpen(true)
      setMessage(message)
      setTimeout(() => {
        setOpen(false)
      }, 2000);
    }
  return (
    <SnackbarContext.Provider value={showAndDeleteSnackbar}>
      <MySnackbar open={open} message={message} />
      {children}
    </SnackbarContext.Provider>
  )
}

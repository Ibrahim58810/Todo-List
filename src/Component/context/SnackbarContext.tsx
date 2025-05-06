import { createContext } from "react";
export const SnackbarContext = createContext<(message: string) => void>(() => { });

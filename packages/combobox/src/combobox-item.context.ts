import { createContext } from "@aria-ui/core"

export const inputValueContext = createContext<string>(
  "ComboboxItem/inputValue",
  "",
)

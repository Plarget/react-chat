import { useState } from "react"
import { TUseToggle } from "./types.ts"

const useToggle: TUseToggle = (defaultState) => {
  const [value, setValue] = useState<boolean>(defaultState)

  const toggleState = () => setValue(a => !a)

  return {value, toggleState, setValue}
}

export default useToggle
import { useEffect, useState } from "react"
import { TUseDebounce } from "./types.ts"

const useDebounce: TUseDebounce = (value, delay = 500) => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value])

  return debounceValue
}

export default useDebounce
import { useEffect } from "react"
import { TUseClickOutside } from "./types"

const useClickOutside: TUseClickOutside = (callback, ref) => {
  const onClick: EventListener = (event) => {
    if (!ref.current) return

    const path = event.composedPath()
    const isClickOutside = !path.includes(ref.current)

    if (isClickOutside) {
      callback()
    }
  }

  useEffect(() => {
    document.addEventListener("click", onClick)

    return () => {
      document.removeEventListener("click", onClick)
    }
  })
}

export default useClickOutside
import { TUseBodyLock } from "./types.ts"


const useBodyLock: TUseBodyLock = ( ) => {
  return (state) => {
    if (state) {
      document.body.classList.add("is-lock")
    } else {
      document.body.classList.remove("is-lock")
    }
  }
}

export default useBodyLock
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { TUseBodyLock } from "@/shared/hooks/types.ts"


const useBodyLock: TUseBodyLock = (state,ref) => {
  return () => {
    if (!ref?.current) return null
    if (state) {
      disableBodyScroll(ref.current, { reserveScrollBarGap: true, })
    } else {
      enableBodyScroll(ref.current)
    }
  }
}

export default useBodyLock
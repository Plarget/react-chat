import { FC, PropsWithChildren } from "react"
import "./Wrapper.pcss"

const Wrapper: FC<PropsWithChildren> = (props) => {
  const {children} = props

  return (
    <div className="wrapper">
      <div className="wrapper__body">
        {children}
      </div>
    </div>
  )
}

export default Wrapper
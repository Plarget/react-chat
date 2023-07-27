import type { FC } from "react"
import { Link } from "react-router-dom"
import "./Preview.pcss"

const Preview: FC = () => {
  return (
    <div>
      <Link to={"profile"}>Профиль</Link>
    </div>
  )
}

export default Preview
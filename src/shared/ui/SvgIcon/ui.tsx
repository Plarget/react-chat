import type { FC } from "react"
import { TSvgIcon } from "./types.ts"

const SvgIcon: FC<TSvgIcon> = (props) => {
  const {
    name,
    prefix = "icon",
    ...rest
  } = props

  const symbolId = `#${prefix}-${name}`

  return (
    <svg  {...rest} aria-hidden="true">
      <use href={symbolId}/>
    </svg>
  )
}

export default SvgIcon
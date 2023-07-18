import { BrowserRouter } from "react-router-dom"
import { TComponentFn } from "./types.ts"

export const withRouter = (component: TComponentFn) => () => {
  return (
    <BrowserRouter>{component()}</BrowserRouter>
  )
}
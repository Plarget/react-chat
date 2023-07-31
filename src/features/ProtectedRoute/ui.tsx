import type { FC, PropsWithChildren } from "react"
import useAppSelector from "@/shared/hooks/useAppSelector.ts"
import { Navigate } from "react-router"

const ProtectedRoute: FC<PropsWithChildren> = (props) => {
  const {children} = props

  const isAuth = useAppSelector(state => state.AuthReducer.isAuth)
  console.log(isAuth)
  if (isAuth) {
    return children
  }

  return <Navigate to="/login"/>
}

export default ProtectedRoute
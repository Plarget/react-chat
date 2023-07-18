import { FC, useEffect } from "react"
import Preview from "@/widgets/Preview"
import useAppSelector from "@/shared/hooks/useAppSelector.ts"
import { useNavigate } from "react-router"

const MainPage: FC = () => {
  const user = useAppSelector(state => state.UserReducer)
  const navigate = useNavigate()

  useEffect(() => {
    if (!(user?.user)) {
      navigate("/login")
    }
  }, [user])
  return (
    <>
      <Preview/>
    </>
  )
}

export default MainPage
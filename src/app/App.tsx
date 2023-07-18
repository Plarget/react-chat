import { withProviders } from "./providers"
import { Route, Routes } from "react-router"
import LogInPage from "@/pages/LogInPage"
import MainPage from "@/pages/MainPage"
import SignUpPage from "@/pages/SignUpPage"
import "./styles/index.ts"

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/login" element={<LogInPage/>}/>
        <Route path="/register" element={<SignUpPage/>}/>
      </Routes>
    </div>
  )
}

export default withProviders(App)

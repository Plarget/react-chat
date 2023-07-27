import { withProviders } from "./providers"
import { Route, Routes } from "react-router"
import LogInPage from "@/pages/LogInPage"
import MainPage from "@/pages/MainPage"
import SignUpPage from "@/pages/SignUpPage"
import ProtectedRoute from "@/features/ProtectedRoute"
import ProfilePage from "@/pages/ProfilePage"
import Layout from "@/widgets/Layout"
import "./styles"

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route
            index
            element={
              <ProtectedRoute>
                <MainPage/>
              </ProtectedRoute>}
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <ProfilePage/>
              </ProtectedRoute>}
          />
          <Route path="login" element={<LogInPage/>}/>
          <Route path="register" element={<SignUpPage/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default withProviders(App)

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Todos from "./pages/Todos"

function App() {
	const authUser = localStorage.getItem("auth_user")

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path='/'
						element={<Navigate to={authUser ? "/todos" : "/login"} />}
					/>
					<Route
						path='/signup'
						element={<Signup />}
					/>
					<Route
						path='/login'
						element={<Login />}
					/>
					<Route
						path='/todos'
						element={<Todos />}
					/>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App

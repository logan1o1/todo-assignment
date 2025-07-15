/** @format */

import { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
// import "./App.css"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Todos from "./pages/Todos"

function App() {
	const [count, setCount] = useState(0)

	return (
		<>
			<BrowserRouter>
				<Routes>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/" element={<Todos />}/>
        </Routes>
			</BrowserRouter>
		</>
	)
}

export default App

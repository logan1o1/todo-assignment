import { useEffect, useState } from "react"
import TodoItem from "../components/TodoItem"
import { useAuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Todos() {
	const [tasks, setTasks] = useState([])
	const [newText, setNewText] = useState("")
	const {logout} = useAuthContext
	const authUser = localStorage.getItem("auth_user")
  const navigate = useNavigate()

	async function addTodos() {
		try {
			const result = await fetch("/api/tasks/post", {
				method: "POST",
				body: JSON.stringify({ text: newText, user: authUser }),
				headers: {
					"Content-Type": "application/json",
				},
			})
			const data = await result.json()

			if (data.success == false) {
				console.log("Error reading data from handleAdd")
				return
			}
		} catch (error) {
			console.log("Error: ", error.message)
		}
	}

	async function getTodos() {
		try {
			const result = await fetch("/api/tasks/get")
			const data = await result.json()

			if (data.success == false) {
				console.log("Error reading data from getTodos")
				return
			}

			setTasks(data)
		} catch (error) {
			console.log("Error: ", error.message)
		}
	}

	useEffect(() => {
		getTodos()
	}, [])

	async function completeTodo(id) {
		try {
			const result = await fetch(
				`/api/tasks/complete/${id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			const data = await result.json()
      
			if (data.success == false) {
				console.log(data.message)
				return
			}

			setTasks(tasks.map((t) => t._id === id ? { ...t, completed: data.completed } : t ))
		} catch (error) {
			console.log("Error: ", error.message)
		}
	}

  async function deleteTodo(id) {
    try {
      const result = await fetch(`/api/tasks/delete/${id}`, {
        method: 'DELETE'
      })
      const data = await result.json()

      if(data.success == false){
        console.log(data.message)
				return
      }
      console.log(data.message);
      setTasks(tasks.filter((t) => t._id !== id))
    } catch (error) {
      console.log("Error: ", error.message)
    }
  }

  async function handleLogout() {
    try {
      const result = await fetch("/api/auth/logout")
      const data = await result.json()

      if(data.success == false){
        console.log(data.message)
				return
      }
      localStorage.removeItem("auth_user")
      navigate('/login')
      console.log(data.message);
    } catch (error) {
      console.log("Error: ", error.message)
    }
  }

	return (
		<div className='min-h-screen bg-gray-100 py-8'>
      <div className="max-w-md mx-auto mb-4 flex justify-between items-center px-6">
        <h2 className="text-xl font-semibold text-gray-800">My To-Dos</h2>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
			<div className='max-w-md mx-auto bg-white p-6 rounded-lg shadow'>
				<div className='flex mb-4'>
					<input
						value={newText}
						onChange={(e) => setNewText(e.target.value)}
						placeholder='New task...'
						className='flex-grow p-2 border rounded-l'
					/>
					<button
						onClick={addTodos}
						className='px-4 bg-blue-600 text-white rounded-r hover:bg-blue-700'>
						Add
					</button>
				</div>
				<div className='space-y-2'>
					{tasks.map((task) => (
						<TodoItem
							key={task._id}
							task={task}
							onToggle={ () =>  completeTodo(task._id)}
							onDelete={() => deleteTodo(task._id)}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

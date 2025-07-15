import { useEffect, useState } from "react"
import TodoItem from "../components/TodoItem"
// import { useAuthContext } from "../context/AuthContext"

export default function Todos() {
	const [tasks, setTasks] = useState([])
	const [newText, setNewText] = useState("")
  // const {authUser} = useAuthContext
  const authUser= localStorage.getItem("auth_user")

	async function handleAdd() {
		try {
      const result = await fetch("/api/tasks/post", {
        method: "POST",
        body: JSON.stringify({text: newText, user: authUser}),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await result.json()

      if (data.success == false) {
        console.log("Error reading data from handleAdd");
        return;
      }
		} catch (error) {
      console.log("Error: ", error.message);
    }
	}

  async function getTodos() {
    try {
      const result = await fetch("/api/tasks/get");
      const data = await result.json();

      if (data.success == false) {
        console.log("Error reading data from getTodos");
        return;
      }

      setTasks(data)
    } catch (error) {
      console.log("Error: ", error.message);
    }
  }

  useEffect(() => {
    getTodos()
  }, [])


  
	return (
		<div className='min-h-screen bg-gray-100 py-8'>
			<div className='max-w-md mx-auto bg-white p-6 rounded-lg shadow'>
				<div className='flex mb-4'>
					<input
						value={newText}
						onChange={(e) => setNewText(e.target.value)}
						placeholder='New task...'
						className='flex-grow p-2 border rounded-l'
					/>
					<button
						onClick={handleAdd}
						className='px-4 bg-blue-600 text-white rounded-r hover:bg-blue-700'>
						Add
					</button>
				</div>
				<div className='space-y-2'>
					{tasks.map((task) => (
						<TodoItem
							key={task._id}
							task={task}
							onToggle={() => {
								setTasks(
									tasks.map((t) =>
										t.id === task.id ? { ...t, completed: !t.completed } : t
									)
								)
							}}
							onDelete={() => {
								setTasks(tasks.filter((t) => t.id !== task.id))
							}}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

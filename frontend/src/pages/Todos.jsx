import { useState } from 'react';
import TodoItem from '../components/TodoItem';

export default function Todos() {
  const [tasks, setTasks] = useState([
    // → populate this after your data fetch
    { id: 1, text: 'Example task', completed: false },
  ]);
  const [newText, setNewText] = useState('');

  const handleAdd = () => {
    // → call your create‑task API, then update state
    const next = { id: Date.now(), text: newText, completed: false };
    setTasks([next, ...tasks]);
    setNewText('');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
        <div className="flex mb-4">
          <input
            value={newText}
            onChange={e => setNewText(e.target.value)}
            placeholder="New task..."
            className="flex-grow p-2 border rounded-l"
          />
          <button
            onClick={handleAdd}
            className="px-4 bg-blue-600 text-white rounded-r hover:bg-blue-700"
          >
            Add
          </button>
        </div>
        <div className="space-y-2">
          {tasks.map(task => (
            <TodoItem
              key={task.id}
              task={task}
              onToggle={() => {
                // → toggle and persist
                setTasks(tasks.map(t =>
                  t.id === task.id ? { ...t, completed: !t.completed } : t
                ));
              }}
              onDelete={() => {
                // → delete and persist
                setTasks(tasks.filter(t => t.id !== task.id));
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

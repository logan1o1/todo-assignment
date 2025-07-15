export default function TodoItem({ task, onToggle, onDelete }) {
  return (
    <div className="flex items-center justify-between p-2 border rounded">
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={onToggle}
          className="h-4 w-4"
        />
        <span className={task.completed ? 'line-through text-gray-500' : ''}>
          {task.text}
        </span>
      </label>
      <button
        onClick={onDelete}
        className="text-red-600 hover:text-red-800 font-bold"
      >
        ×
      </button>
    </div>
  );
}

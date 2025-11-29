import { useState } from 'react';
import { Plus, Trash2, CheckSquare, Square } from 'lucide-react';

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Complete React Course', completed: false },
    { id: 2, text: 'Update Profile', completed: true },
  ]);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    
    setTodos([
      ...todos,
      { id: Date.now(), text: newTodo, completed: false }
    ]);
    setNewTodo('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <CheckSquare className="h-5 w-5 text-primary-600 mr-2" />
        My Learning Goals
      </h3>
      
      <form onSubmit={handleAddTodo} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new goal..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <button 
          type="submit"
          className="p-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
        </button>
      </form>

      <div className="space-y-2">
        {todos.length === 0 ? (
          <p className="text-gray-500 text-center text-sm py-4">No goals yet. Add one above!</p>
        ) : (
          todos.map(todo => (
            <div 
              key={todo.id} 
              className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md group"
            >
              <button 
                onClick={() => toggleTodo(todo.id)}
                className="flex items-center flex-1 text-left"
              >
                {todo.completed ? (
                  <CheckSquare className="h-4 w-4 text-primary-600 mr-3 flex-shrink-0" />
                ) : (
                  <Square className="h-4 w-4 text-gray-400 mr-3 flex-shrink-0" />
                )}
                <span className={`text-sm ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                  {todo.text}
                </span>
              </button>
              <button 
                onClick={() => deleteTodo(todo.id)}
                className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;

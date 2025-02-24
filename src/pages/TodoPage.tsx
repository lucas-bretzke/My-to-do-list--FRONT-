import React, { useEffect, useState } from 'react'
import { http } from '../services/config'

interface Task {
  id: number
  title: string
  completed: boolean
}

const TodoPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await http.get('/tasks')
      setTasks(response.data)
    }
    fetchTasks()
  }, [])

  return (
    <div>
      <h2>Lista de Tarefas</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} - {task.completed ? '✅' : '❌'}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoPage

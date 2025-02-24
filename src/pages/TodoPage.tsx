import React, { useEffect, useState } from 'react'
import { http } from '../services/config'
import TaskForm from '../components/TaskForm'
import TaskItem from '../components/TaskItem'

interface Task {
  id: number
  title: string
  completed: boolean
}

const TodoPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  const fetchTasks = async () => {
    const response = await http.get('/tasks')
    setTasks(response.data)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const addTask = async (title: string) => {
    await http.post('/tasks', { title, completed: false })
    fetchTasks()
  }

  const removeTask = async (taskId: number) => {
    try {
      await http.delete(`/tasks/${taskId}`)
      console.log('Tarefa removida com sucesso!')
      fetchTasks()
    } catch (error) {
      console.error('Erro ao remover tarefa:', error)
    }
  }

  const checkedTask = async (task: Task) => {
    console.log('MINHA TASK:', task)
    try {
      const response = await http.put(`/tasks/${task.id}`, {
        ...task,
        completed: true
      })
      console.log('Tarefa atualizada:', response.data)
      fetchTasks()
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error)
    }
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <h2>Lista de Tarefas</h2>
      <TaskForm addTask={addTask} />
      <ul>
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            checkedTask={checkedTask} // Passa a função como referência
            removeTask={removeTask} // Passa a função como referência
          />
        ))}
      </ul>
    </div>
  )
}

export default TodoPage

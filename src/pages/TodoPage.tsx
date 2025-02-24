import React, { useEffect, useState } from 'react'
import { http } from '../services/config'
import TaskForm from '../components/TaskForm'
import TaskItem from '../components/TaskItem'

interface Task {
  id: number
  title: string
  completed: boolean
  status: 'pendente' | 'em progresso' | 'concluída'
  createdAt: string
  completedAt?: string
}

const TodoPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [sortOrder, setSortOrder] = useState<
    'createdAt' | 'status' | 'pendente' | 'concluída'
  >('createdAt')

  const fetchTasks = async () => {
    const response = await http.get('/tasks')
    setTasks(response.data)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const addTask = async (title: string) => {
    const createdAt = new Date().toISOString()
    const status: 'pendente' = 'pendente' // Default status is 'pendente'
    await http.post('/tasks', { title, completed: false, status, createdAt })
    fetchTasks()
  }

  const removeTask = async (taskId: number) => {
    try {
      await http.delete(`/tasks/${taskId}`)
      fetchTasks()
    } catch (error) {
      console.error('Erro ao remover tarefa:', error)
    }
  }

  const editTaskTitle = async (taskId: number, newTitle: string) => {
    try {
      if (!newTitle.trim()) return
      await http.put(`/tasks/${taskId}`, { title: newTitle })
      fetchTasks() // Update tasks after saving
    } catch (error) {
      console.error('Error editing task title:', error)
    }
  }

  const checkedTask = async (task: Task) => {
    const completedAt = new Date().toISOString()

    try {
      const response = await http.put(`/tasks/${task.id}`, {
        ...task,
        completed: true,
        status: 'concluída',
        completedAt
      })
      fetchTasks()
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error)
    }
  }

  const sortTasks = () => {
    // First filter based on status (if needed)
    let filteredTasks = [...tasks]

    if (sortOrder === 'pendente') {
      filteredTasks = filteredTasks.filter(task => task.status === 'pendente')
    }

    if (sortOrder === 'concluída') {
      filteredTasks = filteredTasks.filter(task => task.status === 'concluída')
    }

    // Then sort based on other criteria
    if (sortOrder === 'createdAt') {
      return filteredTasks.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    }

    // If the sortOrder is 'status', we want 'concluída' tasks to come first, and others sorted by createdAt
    return filteredTasks.sort((a, b) => {
      if (b.status === 'concluída' && a.status !== 'concluída') return -1
      if (b.status !== 'concluída' && a.status === 'concluída') return 1
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }

  const handleSortChange = (
    order: 'createdAt' | 'status' | 'pendente' | 'concluída'
  ) => {
    setSortOrder(order)
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
      <main
        style={{
          width: '1100px',
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '80px'
        }}
      >
        <h2 style={{ padding: '15px' }}>Lista de Tarefas</h2>
        <TaskForm addTask={addTask} />

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => handleSortChange('createdAt')}>
            Ordenar por Data de Criação
          </button>
          <button onClick={() => handleSortChange('status')}>
            Ordenar por Status
          </button>
          <button onClick={() => handleSortChange('pendente')}>
            Pendentes
          </button>
          <button onClick={() => handleSortChange('concluída')}>
            Concluída
          </button>
        </div>

        <ul>
          {sortTasks().map(task => (
            <TaskItem
              key={task.id}
              task={task}
              checkedTask={checkedTask}
              removeTask={removeTask}
              editTaskTitle={editTaskTitle}
            />
          ))}
        </ul>
      </main>
    </div>
  )
}

export default TodoPage

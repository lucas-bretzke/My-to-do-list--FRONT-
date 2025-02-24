import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Form = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  min-width: 700px;
`

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`

const Button = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`


const TaskForm: React.FC<any> = ({
  addTask,
  editingTask,
  saveTask
}) => {
  const [task, setTask] = useState<string>('')

  useEffect(() => {
    if (editingTask) {
      setTask(editingTask.title)
    }
  }, [editingTask])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (task.trim()) {
      if (editingTask) {
        saveTask({ ...editingTask, title: task })
      } else {
        addTask(task)
      }
      setTask('')
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type='text'
        value={task}
        onChange={e => setTask(e.target.value)}
        placeholder={editingTask ? 'Editar tarefa' : 'Adicionar nova tarefa'}
      />
      <Button type='submit'>{editingTask ? 'Salvar' : 'Adicionar'}</Button>
    </Form>
  )
}

export default TaskForm

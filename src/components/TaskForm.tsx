// src/components/TaskForm.tsx
import React, { useState } from 'react'
import styled from 'styled-components'

const Form = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  width: 1100px;
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

interface TaskFormProps {
  addTask: (task: string) => void
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [task, setTask] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (task.trim()) {
      addTask(task)
      setTask('')
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type='text'
        value={task}
        onChange={e => setTask(e.target.value)}
        placeholder='Adicionar nova tarefa'
      />
      <Button type='submit'>Adicionar</Button>
    </Form>
  )
}

export default TaskForm

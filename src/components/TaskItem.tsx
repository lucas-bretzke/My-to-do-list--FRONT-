import React from 'react'
import styled from 'styled-components'
import { http } from '../services/config'

const TaskContainer = styled.div`
  width: 1100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`

const TaskText = styled.span`
  flex: 1;
`

const RemoveButton = styled.button`
  padding: 5px 10px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: darkred;
  }
`

interface TaskItemProps {
  task: {
    id: number
    title: string
    completed: boolean
  }
  checkedTask: (task: any) => void
  removeTask: (taskId: number) => void
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  checkedTask,
  removeTask
}) => {
  return (
    <TaskContainer>
      <TaskText>
        {task.title} - {task.completed ? '✅' : '❌'}
      </TaskText>

      {!task.completed && (
        <RemoveButton onClick={() => checkedTask(task)}>
          Marcar como concluido ✅
        </RemoveButton>
      )}
      <RemoveButton onClick={() => removeTask(task.id)}>Remover</RemoveButton>
    </TaskContainer>
  )
}

export default TaskItem

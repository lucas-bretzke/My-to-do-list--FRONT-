import React, { useState, useRef } from 'react'
import styled from 'styled-components'

const TaskContainer = styled.div`
  min-width: 700px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`

const TaskText = styled.span`
  flex: 1;
  cursor: pointer;
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

const MarkAsCompleted = styled.button`
  padding: 5px 10px;
  margin-right: 7px;
  color: white;
  border: none;
  background-color: rgb(0, 174, 193);
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: rgb(0, 142, 158);
  }
`

interface TaskItemProps {
  task: {
    id: number
    title: string
    completed: boolean
    status: 'pendente' | 'em progresso' | 'concluída'
    createdAt: string
    completedAt?: string
  }
  checkedTask: (task: any) => void
  removeTask: (taskId: number) => void
  editTaskTitle: (taskId: number, newTitle: string) => void
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  checkedTask,
  removeTask,
  editTaskTitle
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(task.title)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDoubleClick = () => {
    setIsEditing(true)
  }

  const handleBlur = () => {
    saveTitle()
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      saveTitle()
    }
  }

  const saveTitle = () => {
    if (newTitle !== task.title) {
      editTaskTitle(task.id, newTitle)
    }
    setIsEditing(false)
  }

  return (
    <TaskContainer>
      <TaskText onDoubleClick={handleDoubleClick}>
        {isEditing ? (
          <input
            ref={inputRef}
            type='text'
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            onBlur={handleBlur}
            onKeyPress={handleKeyPress}
            autoFocus
          />
        ) : (
          <span>
            {task.title}📝 - {!task.completed && task.status}{' '}
            {task.completed ? '✅' : '❌'}
            {task.completed && task.completedAt && (
              <span>
                {' '}
                (Concluída em: {new Date(task.completedAt).toLocaleString()})
              </span>
            )}
          </span>
        )}
      </TaskText>

      {!task.completed && (
        <MarkAsCompleted onClick={() => checkedTask(task)}>
          Marcar como Concluída ✅
        </MarkAsCompleted>
      )}
      <RemoveButton onClick={() => removeTask(task.id)}>Remover</RemoveButton>
    </TaskContainer>
  )
}

export default TaskItem

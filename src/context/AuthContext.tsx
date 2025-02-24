import React, { createContext, useContext, useState } from 'react'
import {http} from '../services/config'

interface AuthContextType {
  user: string | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [user, setUser] = useState<string | null>(null)

  const login = async (username: string, password: string) => {
    const response = await http.post('/login', { username, password })
    setUser(response.data.token)
    localStorage.setItem('token', response.data.token)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}

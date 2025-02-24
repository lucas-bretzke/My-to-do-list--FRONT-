// src/App.tsx
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import TodoPage from './pages/TodoPage'
import GlobalStyles from './styles/GlobalStyles'

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth()
  return user ? children : <Navigate to='/login' />
}

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <GlobalStyles />
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route
            path='/'
            element={
              // <PrivateRoute>
                <TodoPage />
              // </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App

import './App.css'
import { Toaster } from 'react-hot-toast'

import { Routes, Route } from 'react-router'

import Layout from '@components/layout/Layout'
import Main from '@pages/Main'
import NotFound from '@pages/NotFound'
import Quizzes from '@pages/quizzes/Quizzes'
import Deployments from '@pages/quizzes/Deployments'
import Submissions from '@pages/quizzes/Submissions'
import Dashboard from '@pages/quizzes/Dashboard'

function App() {
  const ROUTES = [
    { element: <Main />, path: '/' },
    // Quiz
    { element: <Quizzes />, path: '/quizzes' },
    { element: <Deployments />, path: '/quizzes/deployments' },
    { element: <Submissions />, path: '/quizzes/submissions' },
    { element: <Dashboard />, path: '/quizzes/dashboard' },
    // Not Found
    { element: <NotFound />, path: '*' },
  ]

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          {ROUTES.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </Route>
      </Routes>

      <Toaster position="bottom-right" />
    </>
  )
}

export default App

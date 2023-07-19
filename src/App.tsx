import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HealthListProvider } from 'contexts/providers/HealthListProvider'
import Main from './pages/Main'

function App() {
  return (
    <>
      <BrowserRouter>
        <HealthListProvider>
          <Routes>
            <Route path="/" Component={Main} />
          </Routes>
        </HealthListProvider>
      </BrowserRouter>
    </>
  )
}

export default App

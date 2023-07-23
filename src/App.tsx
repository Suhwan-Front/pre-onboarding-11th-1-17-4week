import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SickAPIProvider } from 'contexts/providers/SickListProvider'
import GlobalStyle from 'utils/GlobalStyle'
import Main from './pages/Main'

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <SickAPIProvider>
          <Routes>
            <Route path="/" Component={Main} />
          </Routes>
        </SickAPIProvider>
      </BrowserRouter>
    </>
  )
}

export default App

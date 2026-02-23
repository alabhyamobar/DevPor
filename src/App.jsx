import React from 'react'
import PrimaryLoading from './components/PrimaryLoading'
import { Route, Routes } from 'react-router-dom'
import Landing from './Pages/Landing'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<PrimaryLoading />} />
        <Route path='/landing' element={<Landing />} />
      </Routes>
    </>
  )
}

export default App
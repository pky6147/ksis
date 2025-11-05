//import React, { useState } from 'react'
import { Routes, Route, Navigate  } from "react-router-dom";
import LoginPage from './page/00_Login'
import TestPage from './page/99_Test'

function App() {
  // const [userInfo, setUserInfo] = useState([])


  return (
    <Routes>
      {/* 기본 경로로 들어오면 /login 으로 리다이렉트 */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      {/* Login */}
      <Route path="/login" element={<LoginPage/>} />
      {/* Test */}
      <Route path="/test" element={<TestPage/>} />
    </Routes>
  )
}

export default App

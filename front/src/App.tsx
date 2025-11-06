//import React, { useState } from 'react'
import { Routes, Route, Navigate, useLocation   } from "react-router-dom";
import {Box} from '@mui/material'
import Side from "./layout/Side";
import Content from "./layout/Content";
import Menu from "./component/Menu";

import LoginPage from './page/00_Login'
import TestPage from './page/99_Test'
import UserManagement from "./page/01_UserManagement/UserManagement";

function App() {
  const location = useLocation();

  // 사이드바/콘텐츠를 숨길 경로 목록
  const hideLayoutPaths = ["/login", "/test"];
  const shouldHideLayout = hideLayoutPaths.includes(location.pathname);

  return (
    <Box sx={{ width: '100vw', display: 'flex', backgroundColor: '#f6e473ff' }}>
      {shouldHideLayout ? (
        // 로그인, 테스트 페이지는 단독 표시
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      ) : (
        // 나머지 페이지는 Side + Content 포함
        <>
          <Box sx={{width: '14.5vw', padding: 1}}>
            <Side>
              <Menu />
            </Side>
          </Box>
          <Box sx={{width: '84.5vw', padding: 1}}>
            <Content>
              <Routes>
                <Route path="/user" element={<UserManagement />} />
              </Routes>
            </Content>
          </Box>
        </>
      )}
    </Box>
  )
}

export default App

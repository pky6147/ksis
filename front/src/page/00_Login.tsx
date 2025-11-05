import React from "react"
import { Box, Typography } from '@mui/material'
import logo from '../assets/ksisLogo.png'

function Login() {


  return (
    <Box sx={{ width: '100vw', height: '100vh'}}>
        {/* 제목 영역 */}
        <Box sx={{ display: 'flex', width: '100%', backgroundColor: '#000', gap: 5, minHeight: '10vh', alignItems: 'center'}}>
          {/* Logo */}
          <Box>
            {<img src={logo} alt="company logo" style={{ height: '100%', width: '100%' }} />}
          </Box>
          {/* Title */}
          <Box>
            <Typography sx={{ fontSize: 50, fontWeight: 'bold'}}>KSIS 데이터 수집 시스템</Typography>
          </Box>
        </Box>
        {/* 로그인 화면 */}
        <Box sx={{ backgroundColor: '#fff', width: '100%', height: '90vh'}}>

        </Box>
    </Box>
  )
}

export default Login

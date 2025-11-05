import {useState} from "react"
import { Box, Typography } from '@mui/material'
import logo from '../assets/ksisLogo.png'
import CustomButton from "../component/CustomButton"
import CustomTextField from "../component/CustomTextField"

function Login() {
  const [loginInfo, setLoginInfo] = useState<{loginId: string, password: string}>({loginId: "", password: ""})

  const handleInputChange = (key: keyof typeof loginInfo, value: string) => {
        setLoginInfo((prev) => ({ ...prev, [key]: value }));
  };

  const handleLogin = () => {
    alert('버튼 클릭')
    console.log('loginInfo', loginInfo)
  }

  return (
    <Box sx={{ width: '100vw', height: '100vh', backgroundColor: '#fff', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
      <Box sx={{}}>
        {<img src={logo} alt="company logo" style={{ height: '100%', width: '100%' }} />}
        <Typography sx={{ fontSize: 50, fontWeight: 'bold', color: 'black'}}>KSIS 데이터 수집 시스템</Typography>
        <Box sx={{border: '5px solid black', marginTop: 3, padding: 2, borderRadius: 3}}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3}}>
            <Box>
              <Typography sx={{ fontSize: 20, fontWeight: 'bold', color: 'black'}}>아이디</Typography>
              <CustomTextField 
                inputWidth="330px"
                // label="ID"
                variant="standard"
                value={loginInfo?.loginId}
                disabled={false}
                readOnly={false}
                placeholder="ID"
                type="text"
                onChange={(e) => handleInputChange('loginId', e.target.value)}
              />
            </Box>
            <Box>
              <Typography sx={{ fontSize: 20, fontWeight: 'bold', color: 'black'}}>비밀번호</Typography>
              <CustomTextField 
                inputWidth="330px"
                // label="비밀번호"
                variant="standard"
                value={loginInfo?.password}
                disabled={false}
                readOnly={false}
                placeholder="비밀번호"
                type="password"
                onChange={(e) => handleInputChange('password', e.target.value)}
              />
            </Box>
            <CustomButton text="로그인" onClick={handleLogin} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Login

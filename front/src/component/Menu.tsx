import { useNavigate, useLocation  } from 'react-router-dom';
import logo from '../assets/ksisLogo.png'
import { 
    Box,
    Paper,
    MenuList,
    MenuItem,
    ListItemText,
    ListItemIcon,
    Divider,
    ListSubheader,
    // Avatar,
    Typography
} from '@mui/material';
import CustomButton from './CustomButton';
import {
    ManageAccounts,
    Settings,
    Monitor,
    AlarmAdd,
    Logout
} from '@mui/icons-material';
import { type Menu_Type } from '../Types/Components';

function Menu(props: Menu_Type) {
    const {userInfo, onLogout} = props
    const navigate = useNavigate();
    const location = useLocation();  // 현재 경로 얻기

    const userMenu = [
        {title: '유저목록', path: '/user', icon: <ManageAccounts fontSize="small" />},
    ]
    const settingMenu = [
        {title: '데이터 수집 설정', path: '/setting', icon: <Settings fontSize="small" />},
        {title: '데이터 수집 현황', path: '/cursituation', icon: <Monitor fontSize="small" />},
        {title: '스케쥴러', path: '/scheduler', icon: <AlarmAdd fontSize="small" />},
    ]

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',  // ✅ 상단(로고+메뉴)과 하단(유저영역) 분리
            height: '98vh',
            width: '100%',
            minWidth: '180px',
            boxSizing: 'border-box'
        }}>
            {/* --- 상단 영역 (로고 + 메뉴) --- */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* 로고 */}
                <Box sx={{ textAlign: 'center', marginTop: '10px' }}>
                <img
                    src={logo}
                    alt="company logo"
                    style={{ width: '90%', height: 'auto', margin: '0 auto' }}
                />
                </Box>

                {/* 메뉴 */}
                <Paper sx={{ width: '100%'}}>
                    {/* ✅ 관리자 전용 메뉴 */}
                    {userInfo?.role === 'admin' && (
                        <>
                            <ListSubheader sx={{ backgroundColor: 'black', color: 'white' }}>
                                사용자 관리
                            </ListSubheader>
                            <MenuList>
                                {userMenu.map((item, index) => (
                                    <MenuItem
                                        key={index}
                                        onClick={() => navigate(item.path)}
                                        sx={{
                                            borderTop: index > 0 ? '0.5px solid' : undefined,
                                            backgroundColor: location.pathname === item.path ? 'primary.light' : 'inherit',
                                            color: location.pathname === item.path ? 'primary.contrastText' : 'inherit',
                                            '&:hover': {
                                              backgroundColor: location.pathname === item.path ? 'primary.dark' : 'action.hover',
                                            },
                                            marginTop: -1,
                                            marginBottom: -1.05,
                                        }}
                                    >
                                        <ListItemIcon 
                                            sx={{ 
                                                color: location.pathname === item.path ? 'primary.contrastText' : 'inherit',
                                        }}>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={item.title} />
                                    </MenuItem>
                                ))}
                            </MenuList>
                            <Divider />
                        </>
                    )}
                    {/* ✅ 일반 메뉴 (모든 사용자 접근 가능) */}
                    <ListSubheader sx={{backgroundColor:'black', color: 'white'}}>데이터 수집</ListSubheader>
                    <MenuList
                        sx={{
                            
                        }}
                    >
                        { settingMenu.map((item, index) => (
                            <MenuItem
                                key={index}  
                                onClick={() => navigate(item.path)}
                                sx={{
                                    borderTop: index > 0 ? '0.5px solid' : undefined,
                                    backgroundColor: location.pathname === item.path ? 'primary.light' : 'inherit',
                                    color: location.pathname === item.path ? 'primary.contrastText' : 'inherit',
                                    // 첫번째 메뉴 아이템 선택시
                                    '&:first-of-type': {
                                      ...(location.pathname === item.path && {
                                        marginTop: -1,
                                      }),
                                    },
                                    // 마지막 메뉴 아이템 선택시
                                    '&:last-of-type': {
                                      ...(location.pathname === item.path && {
                                        marginBottom: -1.05,
                                      }),
                                    },
                                    '&:hover': {
                                      backgroundColor: location.pathname === item.path ? 'primary.dark' : 'action.hover',
                                    },
                                }} 
                            >
                                <ListItemIcon sx={{color: location.pathname === item.path ? 'primary.contrastText' : 'inherit',}}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.title} />
                            </MenuItem>

                        ))}
                    </MenuList>
                    <Divider />
                </Paper>
            </Box>

            {/* --- 하단 사용자 정보 영역 (고정) --- */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                bgcolor: 'primary.main',
                color: 'white',
                borderRadius: '0 0 10px 10px',
                p: 2,
                boxShadow: 1,
              }}
            >
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  {userInfo?.name || '게스트'}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  환영합니다.
                </Typography>
              </Box>
              <CustomButton
                text="로그아웃"
                width="120px"
                startIcon={<Logout />}
                onClick={onLogout}
              />
            </Box>

            
        </Box>
    )
}

export default Menu;
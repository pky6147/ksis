import { useNavigate } from 'react-router-dom';
import logo from '../assets/ksisLogo.png'
import { 
    Box,
    Paper,
    MenuList,
    MenuItem,
    ListItemText,
    Divider,
    ListSubheader
} from '@mui/material';

const userMenu = [
    {title: '유저목록', path: '/user'},
]
const settingMenu = [
    {title: '데이터 수집 설정', path: '/setting'},
    {title: '스케쥴러', path: '/scheduler'},
    {title: '데이터 수집 현황', path: '/cursituation'},
]

function Menu() {
  const navigate = useNavigate();

    return (
        <Box sx={{padding: 1, gap: 2}}>
            {/* 로고 */}
            <Box>
                {<img src={logo} alt="company logo" style={{ height: '100%', width: '100%' }} />}
            </Box>
            
            {/* 메뉴 */}
            <Paper sx={{ width: '100%', minWidth: '165px'}}>
                <ListSubheader sx={{backgroundColor:'black', color: 'white'}}>사용자 관리</ListSubheader>
                <MenuList>
                    { userMenu.map((item, index) => (
                        <MenuItem
                            sx={index > 0 ? {borderTop: '0.5px solid'} : {}} 
                            key={index}  
                            onClick={() => navigate(item.path)}
                        >
                            <ListItemText primary={item.title} />
                        </MenuItem>
                        
                    ))}
                </MenuList>
                <Divider />
                <ListSubheader sx={{backgroundColor:'black', color: 'white'}}>데이터 수집</ListSubheader>
                <MenuList>
                    { settingMenu.map((item, index) => (
                        <MenuItem
                            sx={index > 0 ? {borderTop: '0.5px solid'} : {}} 
                            key={index}  
                            onClick={() => navigate(item.path)}
                        >
                            <ListItemText primary={item.title} />
                        </MenuItem>
                        
                    ))}
                </MenuList>
                <Divider />
            </Paper>

            {/* 유저 정보 */}
        </Box>
    )
}

export default Menu;
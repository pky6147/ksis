import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Breadcrumbs, Link,
    Radio, RadioGroup, FormControl, FormControlLabel
 } from '@mui/material'
import CommonTable from '../../component/CommonTable'
import { getColumns, type UserLogTableRows } from '../../Types/TableHeaders/UserManageLogHeader'
import CustomButton from '../../component/CustomButton';

export default function LogPage () {
    const location = useLocation();
    const navigate = useNavigate();
    const { userId, loginId } = location.state || {}

    const [baseRows, setBaseRows] = useState<UserLogTableRows[]>([])
    const [filteredRows, setFilteredRows] = useState<UserLogTableRows[]>([]);
    const columns = getColumns();

    const [filterType, setFilterType] = useState('all');  // 라디오 선택값 상태

    useEffect(()=> {
        getTableDatas()
    }, [])

    const getTableDatas = () => {
        const data = [
          { workId: 1, id: 1, index: 1, settingId: 1, settingName: '창원시청 공지사항 수집', userId: 1, loginId: 'ksis1', state: '진행중', startAt: '2025-10-24 09:00', type: '스케줄링' },
          { workId: 2, id: 2, index: 2, settingId: 2, settingName: '창원시청 공지사항 수집', userId: 1, loginId: 'ksis1', state: '수집완료(수집실패: 5건)', startAt: '2025-10-24 09:00', endAt: '2025-10-24 09:43', type: '스케줄링' },
          { workId: 3, id: 3, index: 3, settingId: 3, settingName: '경상남도 보도자료 수집', userId: 1, loginId: 'ksis1', state: '수집완료', startAt: '2025-10-22 15:23', endAt: '2025-10-22 16:00', type: '수동실행' },
        ];
    
        setBaseRows(data)
        console.log('baseRows', baseRows)
        console.log('userId', userId)
        console.log('loginId', loginId)
        setFilteredRows(data)
    }

    const handleClose = () => {
        navigate('/user')
    }

    // 라디오 선택 변경시 호출될 함수
    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFilterType(value);

        // 필터링 처리
        if (value === 'all') {
          setFilteredRows(baseRows);
        } else {
          setFilteredRows(baseRows.filter(row => row.type === value));
        }
    };

    return (
        <Box sx={{ height: '97%'}}>
            <Box sx={{ bgcolor: '#FFC98B', height: '120px', borderRadius: '10px 10px 0px 0px', display: 'flex', alignItems: 'center'}}>
                <Typography sx={{fontSize: 60, fontWeight: 'bold', color: 'black', paddingLeft: 5, }}>
                  데이터 수집 요청 로그
                </Typography>
            </Box>
                {/* BreadCrumbs */}
                <Box sx={{padding: 2}}>
                    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }}>
                        <Link
                            component={RouterLink}
                            to="/user"
                            underline="hover"
                            color="inherit"
                            sx={{ fontWeight: 'bold', fontSize: 16 }}
                        >
                            유저관리
                        </Link>
                        <Typography color="text.primary" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                            데이터 수집 요청 로그
                        </Typography>
                    </Breadcrumbs>
                </Box>
                {/* Search */}
                {/* RadioBtn */}
                <Box sx={{display: 'flex', justifyContent: 'flex-end', padding: 2}}>
                    <FormControl>
                        <RadioGroup
                            row
                            value={filterType} 
                            onChange={handleFilterChange} 
                            sx={{color: 'black'}}
                        >
                            <FormControlLabel 
                                value="all" 
                                control={
                                    <Radio sx={{
                                        color: 'gray',
                                        '&.Mui-checked': {
                                            color: '#BB510C', 
                                        }
                                    }}/>
                                } 
                                label="전체" 
                            />
                            <FormControlLabel 
                                value="스케줄링" 
                                control={
                                    <Radio sx={{
                                        color: 'gray',
                                        '&.Mui-checked': {
                                            color: '#BB510C', 
                                        }
                                    }}/>
                                } 
                                label="스케줄링" 
                            />
                            <FormControlLabel 
                                value="수동실행" 
                                control={
                                    <Radio sx={{
                                        color: 'gray',
                                        '&.Mui-checked': {
                                            color: '#BB510C', 
                                        }
                                    }}/>
                                } 
                                label="수동실행" 
                            />
                        </RadioGroup>
                    </FormControl>
                </Box>
                {/* 테이블 영역 */}
                <Box sx={{padding: 2}}>
                    <CommonTable columns={columns} rows={filteredRows} />
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'flex-end', padding: 2}}>
                    <CustomButton text="닫기" onClick={handleClose} backgroundColor='#f0f0f0' radius={2}/>
                </Box>
        </Box>
    )
}
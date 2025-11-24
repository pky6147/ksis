import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
// Mui
import { Box, Typography, Paper } from '@mui/material'
// Table
import CommonTable from "../../component/CommonTable"
import { getColumns, type StatusTableRows } from '../../Types/TableHeaders/StatusHeader'
function Status() {
  // Table
  const [baseRows, setBaseRows] = useState<StatusTableRows[]>([])
  const [filteredRows, setFilteredRows] = useState<StatusTableRows[]>([]);
  const [selectedRow, setSelectedRow] = useState<StatusTableRows | null>(null)


    const navigate = useNavigate();

  useEffect(()=> {
    const data = [
      { id: 1, settingName: '창원시청 공지사항 수집', startAt:'2025-10-24 09:00', type:'스케줄링', startDate:'2025.10.24', endDate:'2025.11.23', period:'2025.10.24 ~ 2025.11.23', cycle:'매주 월요일', state:'진행중', userId:'',progress:'50%'},
      { id: 2, settingName: '경상남도 보도자료 수집', startAt:'2025-10-04 09:00', type:'스케줄링', startDate:'2025.10.24', endDate:'2025.11.23', period:'2025.10.24 ~ 2025.11.23', cycle:'매주 월요일', state:'진행중', userId:'',progress:'70%'},
      { id: 3, settingName: '창원관광', startAt:'2025-11-24 09:00', type:'수동실행', startDate:'', endDate:'', period:'', cycle:'', state:'진행중', userId:'ksis1',progress:'10%'},

    ];

    setBaseRows(data)
    setFilteredRows(data)
  }, [])

  /**  Table Handlers */

    const handleDetailOpen = (row: StatusTableRows) => {
        navigate(`/status/detail/${row.id}`, { state: { rowData: row } })
    }

  const handleStopCrawl = (row: StatusTableRows) => {
    console.log('수집 중지:', row.settingName)
    // TODO: 실제 수집 중지 API 호출
    alert(`${row.settingName} 수집을 중지합니다.`)
  }

  const columns = getColumns({ handleDetailOpen, handleStopCrawl });

  return (
    <Box sx={{ height: '97%' ,display: 'flex', flexDirection: 'column' }}>
      <Typography sx={{ fontSize: 60, fontWeight: 'bold', color: 'black', paddingLeft: 5, marginTop: 5 }}>
        수집 현황
      </Typography>
         <Box sx={{ padding: 2, flex: 1, display: 'flex', flexDirection: 'column' }}> {/*최상위 Box의 남은 공간을 모두 차지하게 */}
          <Paper elevation={3} sx={{ padding: 4, flex: 1, display: 'flex', flexDirection: 'column' }}>{/*Paper가 감싸는 Box의 높이를 꽉 채우게 */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}> {/*Paper 내부 콘텐츠가 Paper의 전체 높이를 사용하게 */}

        {/* 테이블 영역 */}
        <Box sx={{padding: 2, marginTop: 'auto', marginBottom: 'auto'}}>
            <CommonTable columns={columns} rows={filteredRows} />
        </Box>

        </Box>
        </Paper>
      </Box>
    </Box>
  )
}

export default Status

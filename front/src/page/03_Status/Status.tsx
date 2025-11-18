import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
// Mui
import { Box, Typography } from '@mui/material'
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
    <Box sx={{ height: '97%'}}>
        <Typography sx={{fontSize: 60, fontWeight: 'bold', color: 'black', paddingLeft: 2, marginTop: 5}}>
          수집 현황
        </Typography>

        {/* 테이블 영역 */}
        <Box sx={{padding: 2}}>
            <CommonTable columns={columns} rows={filteredRows} />
        </Box>

    </Box>
  )
}

export default Status

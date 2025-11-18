import { useEffect, useState, useMemo} from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { Box, Typography, Button, Paper } from '@mui/material'
import { type GridColDef } from '@mui/x-data-grid'
import CommonTable from '../../component/CommonTable'
import { type StatusTableRows } from '../../Types/TableHeaders/StatusHeader'

function StatusDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const location = useLocation()

  const [detailData, setDetailData] = useState<StatusTableRows | null>(null)

  useEffect(() => {
    // location.state로 전달된 데이터가 있으면 사용
    if (location.state && location.state.rowData) {
      setDetailData(location.state.rowData)
    } else if (id) {
      // state가 없으면 id로 데이터를 가져옴 (API 호출 등)
      // TODO: API 호출로 데이터 가져오기
      console.log('Fetching data for id:', id)
    }
  }, [id, location.state])

  const handleBack = () => {
    navigate('/status')
  }

  const detailColumns: GridColDef[] = useMemo(() => [
       { field: 'settingName', headerName: '데이터수집명', flex: 1, headerAlign: 'center', align: 'center' },
       { field: 'state', headerName: '진행상태', flex: 1, headerAlign: 'center', align: 'center' },
       { field: 'startAt', headerName: '수집시작', flex: 1, headerAlign: 'center', align: 'center' },
       { field: 'endAt', headerName: '수집완료', flex: 1, headerAlign: 'center', align: 'center' },
       { field: 'type', headerName: '실행타입', flex: 1, headerAlign: 'center', align: 'center' },
       { field: 'period', headerName: '수집기간', flex: 1, headerAlign: 'center', align: 'center' },
       { field: 'cycle', headerName: '수집주기', flex: 1, headerAlign: 'center', align: 'center' },
       { field: 'userId', headerName: '유저ID', flex: 1, headerAlign: 'center', align: 'center' },
       ], [])

  const detailRows = useMemo(() => {
      if (!detailData) return []
      return [{
        id: detailData.id,
        settingName: detailData.settingName,
        state: detailData.state,
        startAt: detailData.startAt,
        endAt: detailData.endAt,
        type: detailData.type,
        period: detailData.period,
        cycle: detailData.cycle,
        userId: detailData.userId,
      }]
    }, [detailData])

  return (
    <Box sx={{ height: '97%' }}>
      <Typography sx={{ fontSize: 60, fontWeight: 'bold', color: 'black', paddingLeft: 2, marginTop: 5 }}>
        수집 현황 상세
      </Typography>

      <Box sx={{ padding: 2 }}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                기본 정보
              </Typography>
              <CommonTable
                      columns={detailColumns}
                      rows={detailRows}
                      // height={150}
                      pageSize={1}
                     />
            </Box>

            {/* 추가 정보 섹션 (필요시 확장) */}
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                수집 상세 정보
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, marginLeft: 2 }}>
                {/* TODO: 추가 상세 정보 표시 */}
                <Typography>상세 수집 로그 및 결과가 여기에 표시됩니다.</Typography>
              </Box>
            </Box>

            <Box sx={{ marginTop: 3, display: 'flex', gap: 2 }}>
              <Button variant="contained" onClick={handleBack}>
                닫기
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  )
}

export default StatusDetail

import { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { Box, Typography, Button, Paper } from '@mui/material'
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

  if (!detailData) {
    return (
      <Box sx={{ height: '97%', padding: 2 }}>
        <Typography>데이터를 불러오는 중...</Typography>
      </Box>
    )
  }

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
              <Box sx={{ display: 'flex', width: '915px', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
                <Typography><strong>데이터수집명:</strong> {detailData.settingName}</Typography>
                <Typography><strong>진행상태:</strong> {detailData.state}</Typography>
                <Typography><strong>수집시작:</strong> {detailData.startDate}</Typography>
                <Typography><strong>수집완료:</strong> {detailData.endDate}</Typography>
                <Typography><strong>실행타입:</strong> {detailData.type}</Typography>
                <Typography><strong>유저ID:</strong> {detailData.userId}</Typography>

              </Box>
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

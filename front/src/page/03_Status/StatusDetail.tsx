import { useEffect, useState, useMemo} from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { Box, Typography, Button, Paper, IconButton } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import { type GridColDef } from '@mui/x-data-grid'
import CommonTable from '../../component/CommonTable'
import { type StatusTableRows } from '../../Types/TableHeaders/StatusHeader'


function StatusDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const location = useLocation()

  const [detailData, setDetailData] = useState<StatusTableRows | null>(null)

  const [failureRows, setFailureRows] = useState<Array<{ id: number; progressNo: string; url: string }>>([
    { id: 1, progressNo: '1', url: 'https://example.com/failed-page' },
  ])

  const [collectionRows, setCollectionRows] = useState<Array<{ id: number; progressNo: string; [key: string]: any }>>([])
  const [collectionColumns, setCollectionColumns] = useState<GridColDef[]>([
    { field: 'progressNo', headerName: '진행번호', flex: 1, headerAlign: 'center', align: 'center' },
  ])

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


  // 재수집 버튼 클릭 핸들러
  const handleRecollect = async (progressNo: string, url: string) => {
    try {
      // TODO: API 엔드포인트 URL을 실제 백엔드 주소로 변경
      const response = await fetch('/api/recollect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          settingId: id,
          progressNo,
          url,
        }),
      })

      if (response.ok) {
        console.log('재수집 요청 성공:', progressNo)
        // 성공 메시지 표시 (옵션)
        // alert('재수집 요청이 완료되었습니다.')
      } else {
        console.error('재수집 요청 실패')
        // 에러 메시지 표시 (옵션)
        // alert('재수집 요청에 실패했습니다.')
      }
    } catch (error) {
      console.error('재수집 요청 중 오류:', error)
      // alert('재수집 요청 중 오류가 발생했습니다.')
    }
  }

  const detailSettingColumns: GridColDef[] = useMemo(() => [
       { field: 'settingName', headerName: '데이터수집명', flex: 1, headerAlign: 'center', align: 'center' },
       { field: 'state', headerName: '진행상태', flex: 1, headerAlign: 'center', align: 'center' },
       { field: 'startAt', headerName: '수집시작', flex: 1, headerAlign: 'center', align: 'center' },
       { field: 'endAt', headerName: '수집완료', flex: 1, headerAlign: 'center', align: 'center' },
       { field: 'type', headerName: '실행타입', flex: 1, headerAlign: 'center', align: 'center' },
       { field: 'period', headerName: '수집기간', flex: 1, headerAlign: 'center', align: 'center' },
       { field: 'cycle', headerName: '수집주기', flex: 1, headerAlign: 'center', align: 'center' },
       { field: 'userId', headerName: '유저ID', flex: 1, headerAlign: 'center', align: 'center' },
       ], [])

  const detailSettingRows = useMemo(() => {
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

  // 수집실패 테이블 컬럼 (고정)
  const failureColumns: GridColDef[] = useMemo(() => [
    { field: 'progressNo', headerName: '진행번호', flex: 1, headerAlign: 'center', align: 'center' },

    { field: 'url', headerName: 'URL', flex: 6, headerAlign: 'center', align: 'left' },
    { field: 'recollect', 
      headerName: '재수집',       flex: 1,       headerAlign: 'center',       align: 'center',
            renderCell: (params) => (
        <IconButton
          color="primary"
          size="small"
          onClick={() => handleRecollect(params.row.progressNo, params.row.url)}
          title="재수집"
        >
          <RefreshIcon />
        </IconButton>
      ), },

  ], [])

  // WebSocket 연결 및 실시간 데이터 수신
  useEffect(() => {
    // TODO: WebSocket 연결 및 데이터 수신
    // const ws = new WebSocket('ws://...')
    // ws.onmessage = (event) => {
    //   const data = JSON.parse(event.data)
    //   if (data.type === 'failure') {
    //     setFailureRows(data.rows)
    //   } else if (data.type === 'collection') {
    //     setCollectionRows(data.rows)
    //     // 동적으로 컬럼 생성
    //     const keys = Object.keys(data.rows[0] || {}).filter(k => k !== 'id' && k !== 'progressNo')
    //     const dynamicColumns = keys.map(key => ({
    //       field: key,
    //       headerName: key,
    //       flex: 1,
    //       headerAlign: 'center' as const,
    //       align: 'center' as const,
    //     }))
    //     setCollectionColumns([
    //       { field: 'progressNo', headerName: '진행번호', flex: 1, headerAlign: 'center', align: 'center' },
    //       ...dynamicColumns
    //     ])
    //   }
    // }
    // return () => ws.close()
  }, [id])



  
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
                      columns={detailSettingColumns}
                      rows={detailSettingRows}
                      pageSize={1}
                      hideFooter={true} 

                     />
            </Box>

            {/* 추가 정보 섹션 (필요시 확장) */}
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                수집 실패
              </Typography>
              <CommonTable
                columns={failureColumns}
                rows={failureRows}
                pageSize={5}
                // hideFooter={false}
              />
              
            </Box>

            <Box sx={{ marginTop: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                수집 데이터
              </Typography>

              <CommonTable
                columns={collectionColumns}
                rows={collectionRows}
                pageSize={5}
                //hideFooter={false}
                />
            </Box>

            <Box sx={{ marginTop: 3, display: 'flex', justifyContent:'flex-end', gap: 2 }}>
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

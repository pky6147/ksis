//StatusHeader = "컬럼 정의서"
//각 컬럼의 제목 + 모든 행의 표시 방식을 함께 정의
import { type GridColDef } from '@mui/x-data-grid';
import CustomIconButton from '../../component/CustomIconButton'
import { Box } from '@mui/material';
export interface StatusTableRows {
    id: number,
    SettingId?: number,
    userId?: string,
    settingName?: string,
    startAt?:string,
    startDate?:string,
    endDate?:string,
    period? : string,
    type?: string,
    cycle?: string,
    progress? :string,
    state?:string,


}

 export interface StatusTableColumnHandlers {
    handleStopCrawl: (row: StatusTableRows) => void;
    handleDetailOpen: (row: StatusTableRows) => void;
  }


export const getColumns = ({
    handleStopCrawl,
    handleDetailOpen,
  }: StatusTableColumnHandlers): GridColDef[] => [
    {
    field: 'settingName',    headerName: '데이터수집명',    flex: 1,    headerAlign: 'center',    align: 'center',
    renderCell: (params) => (
      <span
        style={{ cursor: 'pointer', color: '#1976d2', textDecoration: 'underline' }}
        onClick={() => handleDetailOpen(params.row)}
      >
        {params.value}
      </span>
    ),
  },
  { field: 'startAt',           headerName: '수집시작',              flex: 1,    headerAlign: 'center',  align: 'center' },
  { field: 'type',     headerName: '실행타입',       flex: 1,    headerAlign: 'center',  align: 'center' },
  {
    field: 'period',
    headerName: '수집기간',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    valueGetter: (value, row) => `${row.startDate || ''} ~ ${row.endDate || ''}`,
    renderCell: (params) => {
      const startDate = params.row.startDate || '';
      const endDate = params.row.endDate || '';
      return startDate && endDate ? `${startDate} ~ ${endDate}` : startDate || endDate || '-';
    }
  },
  { field: 'cycle',         headerName: '수집주기',           flex: 1,    headerAlign: 'center',  align: 'center' },
  { field: 'userId',         headerName: '유저ID',           flex: 1,    headerAlign: 'center',  align: 'center' },
  { field: 'progress',    headerName: '진행도',    flex: 1,    headerAlign: 'center',    align: 'center',
    renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <span>{params.value}</span>
        <CustomIconButton icon="stop" onClick={() => handleStopCrawl(params.row)} />
      </Box>
    ),
  }
];
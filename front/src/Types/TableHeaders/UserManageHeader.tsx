import { type GridColDef } from '@mui/x-data-grid';
import CustomIconButton from '../../component/CustomIconButton'
import dayjs from 'dayjs'

export interface UserTableRows {
    id: number,
    index?: number,
    loginId?: string,
    password?: string,
    name?: string,
    dept?: string,
    rank?: string,
    loginAt?: string,
    state?: string,
}

// 외부에서 받을 핸들러들을 타입으로 정의
export interface UserTableColumnHandlers {
  handleEditOpen: (row: UserTableRows) => void;
  handleDeleteOpen: (row: UserTableRows) => void;
  handleShowLogOpen: (row: UserTableRows) => void;
}

// 핸들러를 주입받아 columns를 반환하는 함수
export const getColumns = ({
  handleEditOpen,
  handleDeleteOpen,
  handleShowLogOpen,
}: UserTableColumnHandlers): GridColDef[] => [
  { field: 'index',   headerName: '번호',       flex: 0.7,  headerAlign: 'center',  align: 'center' },
  { field: 'loginId', headerName: '아이디',     flex: 1,    headerAlign: 'center',  align: 'center' },
  { field: 'name',    headerName: '이름',       flex: 1,    headerAlign: 'center',  align: 'center' },
  { field: 'dept',    headerName: '부서',       flex: 1.5,  headerAlign: 'center',  align: 'center' },
  { field: 'rank',    headerName: '직위',       flex: 1,    headerAlign: 'center',  align: 'center' },
  { field: 'state',   headerName: '상태',       flex: 1,    headerAlign: 'center',  align: 'center' },
  { field: 'loginAt', headerName: '최근접속일',  flex: 1.5,  headerAlign: 'center',  align: 'center',
    renderCell: (params) => {
      if (!params.value) return ''; // 값 없으면 빈 문자열
      return dayjs(params.value).format('YY.MM.DD');           
    }
  },
  {
    field: 'edit', headerName: '수정', width: 70, headerAlign: 'center', align: 'center',
    renderCell: (params) => ( <CustomIconButton icon="edit" onClick={() => handleEditOpen(params.row)} /> ),
  },
  {
    field: 'del', headerName: '삭제', width: 70, headerAlign: 'center', align: 'center',
    renderCell: (params) => ( <CustomIconButton icon="delete" onClick={() => handleDeleteOpen(params.row)} /> ),
  },
  {
    field: 'log', headerName: '이력조회', width: 100, headerAlign: 'center', align: 'center',
    renderCell: (params) => ( <CustomIconButton icon="log" onClick={() => handleShowLogOpen(params.row)} /> ),
  },
];
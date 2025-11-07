import type { GridColDef, GridRowsProp, GridRowId, GridRowParams, } from '@mui/x-data-grid'

export interface CommonTableProps {
  columns: GridColDef[];  // ✅ 컬럼 정의 타입
  rows: GridRowsProp;     // ✅ 행 데이터 타입
  selectedRows?: { id: GridRowId }[];  // ✅ 선택된 행 상태를 상위에서 받음
  pageSize?: number;      // ✅ 선택적 페이지 크기
  height?: number | string; // ✅ 선택적 높이
  width? : number | string;
  check?: boolean;
  // ✅ 행 클릭 시 자동완성 지원 (params.row 등)
  onRowClick?: (params: GridRowParams) => void;

  // ✅ 선택 변경 시 선택된 id 배열 전달
  onRowSelectionChange?: (ids: GridRowId[]) => void;
}

export interface test {
    a: string
}
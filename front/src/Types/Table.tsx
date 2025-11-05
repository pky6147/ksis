import type { GridColDef, GridRowsProp  } from '@mui/x-data-grid'

export interface CommonTableProps {
  columns: GridColDef[];  // ✅ 컬럼 정의 타입
  rows: GridRowsProp;     // ✅ 행 데이터 타입
  pageSize?: number;      // ✅ 선택적 페이지 크기
  height?: number | string; // ✅ 선택적 높이
  width? : number | string;
  check?: boolean;
}

export interface test {
    a: string
}
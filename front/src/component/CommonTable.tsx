import { Paper } from '@mui/material'
import { DataGrid, type GridRowId, type GridRowSelectionModel} from '@mui/x-data-grid'
import {type CommonTableProps } from '../Types/Table'

function CommonTable(props: CommonTableProps) {
    const {columns, rows, selectedRows, pageSize, height, width, check, onRowClick, onRowSelectionChange} = props

    const paginationModel = { page: 0, pageSize: pageSize || 5 };

     // ✅ v8 기준: rowSelectionModel은 객체 구조 ({ type, ids })
    const rowSelectionModel: GridRowSelectionModel = {
      type: 'include',
      ids: new Set(selectedRows?.map((r) => r.id) ?? []),
  }
    return (
      <Paper sx={{ height: height || 400, width: width || '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          onRowClick={onRowClick}
          rowSelectionModel={rowSelectionModel}
          onRowSelectionModelChange={(model: GridRowSelectionModel) => {
            // ✅ model.ids는 Set<GridRowId> 형태
            const selectedIds = Array.from(model.ids) as GridRowId[]
            onRowSelectionChange?.(selectedIds)
          }}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection={check || false}
          getRowClassName={(params) =>
            params.row.state === '승인대기' ? 'row-inactive' : '' // User 페이지 승인대기일 때
          }
          sx={{
              '&': {
                  '--DataGrid-t-header-background-base': '#F5A623 !important' // 헤더색 변경
              },
              '& .MuiDataGrid-columnHeaders': { 
                  color: 'black', // 헤더 글자색 
                  fontSize: 20, // 글자 크기 
                  fontWeight: 'bold', // 굵기 
              }, 
              '& .row-inactive': {
                backgroundColor: '#f5f5f5',  // 회색 배경
                color: '#999',               // 글자색
                fontStyle: 'italic',
              },
              '& .MuiDataGrid-cell': {
                fontSize: 16, // ✅ 데이터 셀 폰트 크기
                fontWeight: 'Normal'
              },
              // 셀 포커스(보더) 제거
              '& .MuiDataGrid-cell:focus': {
                outline: 'none !important',
              },
              '& .MuiDataGrid-cell:focus-within': {
                outline: 'none !important',
              },
              '& .MuiDataGrid-columnHeader:focus': {
                outline: 'none !important',
              },
              '& .MuiDataGrid-columnHeader:focus-within': {
                outline: 'none !important',
    },
          }}
        />
      </Paper>
    );
}

export default CommonTable;


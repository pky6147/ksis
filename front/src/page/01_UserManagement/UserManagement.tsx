import { useState, useEffect } from "react"
// Mui
import { Box, Dialog, Typography } from '@mui/material'
// Table
import CommonTable from "../../component/CommonTable"
import { getColumns, type UserTableRows } from '../../Types/TableHeaders/UserManageHeader'
// Search
import SearchHeader from "../../component/SearchHeader"
import { getUserSearchCategory } from "../../Types/Search"
// Pages
import EditPage from "./EditPage"
import RegPage from "./RegPage"

function UserManagement() {
  // Table
  const [baseRows, setBaseRows] = useState<UserTableRows[]>([])
  const [filteredRows, setFilteredRows] = useState<UserTableRows[]>([]);
  const [selectedRow, setSelectedRow] = useState<UserTableRows | null>(null)

  // Dialog
  const [openReg, setOpenReg] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openLog, setOpenLog] = useState(false)

  useEffect(()=> {
    const data = [
      { id: 1, index: 1, loginId: 'ksis1', password: 'test1234', name: '김철수', dept: '비즈니스 사업부', rank: '부장', loginAt: '2025-11-05', state: '승인완료' },
      { id: 2, index: 2, loginId: 'ksis2', password: 'test5678', name: '김영희', dept: '소프트웨어 사업부', rank: '대리', loginAt: '2025-11-06', state: '승인완료' },
      { id: 3, index: 3, loginId: 'ksis3', password: 'test0000', name: '홍길동', dept: '경영지원부', rank: '과장', loginAt: '2024-04-24', state: '승인대기' },
    ];

    setBaseRows(data)
    setFilteredRows(data)
  }, [])

  /**  Table  =========================================== */
  const handleEditOpen = (row: UserTableRows) => {
    setSelectedRow(row)
    setOpenEdit(true)
  }
  const handleEdit = () => {
    console.log("본문 Edit")
    // 테이블 새로고침 로직 들어가야함

    handleCloseEdit()
  }
  const handleCloseEdit = () => {
    setSelectedRow(null)
    setOpenEdit(false)
  }

  const handleDeleteOpen = (row: UserTableRows) => {
    setSelectedRow(row)
    setOpenDelete(true)
  }
  const handleCloseDelete = () => {
    setSelectedRow(null)
    setOpenDelete(false)
  }

  const handleShowLogOpen = (row: UserTableRows) => {
    setSelectedRow(row)
    setOpenLog(true)
  }
  const handleCloseLog = () => {
    setSelectedRow(null)
      setOpenLog(false)
  }
  const columns = getColumns({ handleEditOpen, handleDeleteOpen, handleShowLogOpen });

  /**  등록 페이지  =========================================== */
  const handleOpenReg = () => {
      setOpenReg(true)
  }
  const handleCloseReg = () => {
    setSelectedRow(null)
      setOpenReg(false)
  }
  const handleReg = () => {
      // BoardRefresh()
      handleCloseReg()
  }

  return (
    <Box sx={{ height: '97%'}}>
        <Box sx={{ bgcolor: '#FFC98B', height: '120px', borderRadius: '10px 10px 0px 0px', display: 'flex', alignItems: 'center'}}>
            <Typography sx={{fontSize: 60, fontWeight: 'bold', color: 'black', paddingLeft: 10, }}>
              유저관리
            </Typography>
        </Box>
        <SearchHeader
          baseRows={baseRows}                 // 전체 데이터 원본
          setFilteredRows={setFilteredRows}   // 필터링된 데이터 상태 setter
          getSearchCategory={getUserSearchCategory} // 검색 카테고리 목록
          onClick={handleOpenReg}             // 등록 버튼 클릭 시 실행할 함수
          btnName="유저 등록"
        />

        {/* 테이블 영역 */}
        <Box sx={{padding: 2}}>
            <CommonTable columns={columns} rows={filteredRows} /> {/* ✅ 변경 */}
        </Box>

        {/* 등록 페이지 */}
        <Dialog open={openReg} onClose={handleCloseReg} maxWidth={false} disableEnforceFocus disableRestoreFocus>
            <RegPage handleDone={handleReg} handleCancle={handleCloseReg} />
        </Dialog>
        {/* 수정 페이지 */}
        <Dialog open={openEdit} onClose={handleCloseEdit} maxWidth={false} disableEnforceFocus disableRestoreFocus>
            <EditPage row={selectedRow} handleDone={handleEdit} handleCancle={handleCloseEdit} />
        </Dialog>
        {/* 삭제 팝업 */}
        <Dialog open={openDelete} onClose={handleCloseDelete} maxWidth={false} disableEnforceFocus disableRestoreFocus>
            {/* <MaterialReg doFinish={handleRegDone} doCancle={handleCloseReg} /> */}
        </Dialog>
        {/* 이력 조회 화면 */}
        <Dialog open={openLog} onClose={handleCloseLog} maxWidth={false} disableEnforceFocus disableRestoreFocus>
            {/* <MaterialReg doFinish={handleRegDone} doCancle={handleCloseReg} /> */}
        </Dialog>
    </Box>
  )
}

export default UserManagement

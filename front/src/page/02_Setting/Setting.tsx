import { useState, useEffect } from "react"
// Mui
import { Box, Dialog, Typography } from '@mui/material'
// Table
import CommonTable from "../../component/CommonTable"
import { getColumns, type SettingTableRows } from '../../Types/TableHeaders/SettingHeader'
// Search
import SearchHeader from "../../component/SearchHeader"
import { getSettingSearchCategory } from "../../Types/Search"
// Pages
import RegPage from "./RegPage"

function Setting() {
  // Table
  const [baseRows, setBaseRows] = useState<SettingTableRows[]>([])
  const [filteredRows, setFilteredRows] = useState<SettingTableRows[]>([]);
  const [selectedRow, setSelectedRow] = useState<SettingTableRows | null>(null)

  // Dialog
  const [openReg, setOpenReg] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openLog, setOpenLog] = useState(false)

  useEffect(()=> {
    const data = [
      { id: 1, settingName: '창원시청 공지사항 수집', url: 'https://...', userAgent: 'Windows / Edge', rate: 1000, state: '수집대기',  },
      { id: 2, settingName: '경상남도 보도자료 수집', url: 'https://...', userAgent: 'Windows / Chrome', rate: 1000, state: '진행중', },
      { id: 3, settingName: '창원관광 관광지자료 수집', url: 'https://...', userAgent: 'Windows / Chrome', rate: 1000, state: '수집완료', },
    ];

    setBaseRows(data)
    setFilteredRows(data)
  }, [])

  /**  Table  =========================================== */
  const handleEditOpen = (row: SettingTableRows) => {
    setSelectedRow(row)
    setOpenEdit(true)
  }
  const handleEdit = () => {
    // 테이블 새로고침 로직 들어가야함

    handleCloseEdit()
  }
  const handleCloseEdit = () => {
    setSelectedRow(null)
    setOpenEdit(false)
  }

  const handleDeleteOpen = (row: SettingTableRows) => {
    setSelectedRow(row)
    setOpenDelete(true)
  }
  const handleCloseDelete = () => {
    setSelectedRow(null)
    setOpenDelete(false)
  }

  const handleRunCrawl = (row: SettingTableRows) => {
    setSelectedRow(row)
    setOpenLog(true)
  }
  const handleCloseLog = () => {
    setSelectedRow(null)
      setOpenLog(false)
  }
  const columns = getColumns({ handleEditOpen, handleDeleteOpen, handleRunCrawl });

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
        <Typography sx={{fontSize: 60, fontWeight: 'bold', color: 'black', paddingLeft: 2, marginTop: 5}}>
          데이터 수집 설정
        </Typography>
        <SearchHeader
          baseRows={baseRows}                 // 전체 데이터 원본
          setFilteredRows={setFilteredRows}   // 필터링된 데이터 상태 setter
          getSearchCategory={getSettingSearchCategory} // 검색 카테고리 목록
          onClick={handleOpenReg}             // 등록 버튼 클릭 시 실행할 함수
          btnName="설정 등록"
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
            {/* <EditPage row={selectedRow} handleDone={handleEdit} handleCancle={handleCloseEdit} /> */}
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

export default Setting

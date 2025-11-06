import { useState, useEffect } from "react"
// Mui
import { Box, Dialog } from '@mui/material'

// Comp
// import SearchBar from "../component/SearchBar"

// Table
import CommonTable from "../../component/CommonTable"
import { getColumns, type UserTableRows } from '../../Types/TableHeaders/UserManageHeader'
// Search
// import { getUserSearchCategory } from "../Types/Search"

import EditPage from "./EditPage"

function UserManagement() {
  // Table
  const [baseRows, setBaseRows] = useState<UserTableRows[]>([])
  const [selectedRow, setSelectedRow] = useState<UserTableRows | null>(null)
  
  // Search
  // const [searchRows, setSearchRows] = useState<UserTableRows[]>([])
  // const [isSearch, setIsSearch] = useState(false)
  // const [searchList, setSearchList] = useState<{id:number, name: string, value: string}[]>([]) 
  // const [selectedValue, setSelectedValue] = useState('loginId')
  // const [inputValue, setInputValue] = useState("")
  // const [searchCount, setSearchCount] = useState<number|undefined>(undefined)
  // Dialog
  // const [openReg, setOpenReg] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openLog, setOpenLog] = useState(false)

  useEffect(()=> {
    setBaseRows([
      {id: 1, index: 1, loginId: 'ksis1', password: 'test1234', name: '김철수', dept: '비즈니스 사업부',     rank: '부장', loginAt: '2025-11-05', state: '승인완료'},
      {id: 2, index: 2, loginId: 'ksis2', password: 'test5678', name: '김영희', dept: '소프트웨어 사업부',   rank: '대리', loginAt: '2025-11-06', state: '승인완료'},
      {id: 3, index: 3, loginId: 'ksis3', password: 'test0000', name: '홍길동', dept: '경영지원부',         rank: '과장', loginAt: '2024-04-24', state: '승인대기'},
    ])
    
    // setSearchList(getUserSearchCategory())
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
  // const handleOpenReg = () => {
  //     setOpenReg(true)
  // }
  // const handleCloseReg = () => {
  //   setSelectedRow(null)
  //     setOpenReg(false)
  // }
  // const handleReg = () => {
  //     // BoardRefresh()
  //     handleCloseReg()
  // }

  /**  Search  =========================================== */
  // const handleSelectChange = (event: SelectChangeEvent<string>) => {
  //       setSelectedValue(event.target.value)
  //       setInputValue("") // 컬럼 바뀌면 입력 초기화 
  // }

  // const handleSearchChange = (value: string) => {
  //   setInputValue(value)
  // }

  // const handleSearch = () => {
  //   if (!selectedValue) return
  //   setIsSearch(true)
  //   const filtered = baseRows.filter((row) =>
  //     (row[selectedValue as keyof UserTableRows] as string)
  //       ?.toLowerCase()
  //       .includes(inputValue.toLowerCase())
  //   )
  //   setSearchRows(filtered)
  //   setSearchCount(filtered.length)
  // }
  
  // // 초기화
  // const handleReset = () => {
  //   setSelectedValue("loginId")
  //   setInputValue("")
  //   setIsSearch(false)
  //   setSearchRows(baseRows)
  // }

  return (
    <Box sx={{ height: '99.5%'}}>
        {/* <SearchBar 
            options={searchList}
            selectValue={selectedValue}
            onSelectChange={handleSelectChange}
            label="검색"
            inputValue={inputValue}
            onInputChange={(e) => handleSearchChange(e.target.value)}
            onSearch={handleSearch}
            onReset={handleReset}
            searchCount={searchCount}
        /> */}

        {/* 테이블 영역 */}
        <Box sx={{padding: 2}}>
            {/* { isSearch ? (
                <CommonTable 
                columns={columns}
                rows={searchRows}
                />
            ) : ( */}
                <CommonTable 
                    columns={columns}
                    rows={baseRows}
                />
            {/* )} */}
        </Box>

        {/* 등록 페이지 */}
        {/* <Dialog open={openReg} onClose={handleCloseReg} maxWidth={false}>
            
        </Dialog> */}
        {/* 수정 페이지 */}
        <Dialog open={openEdit} onClose={handleCloseEdit} maxWidth={false}>
            <EditPage row={selectedRow} handleDone={handleEdit} handleCancle={handleCloseEdit} />
        </Dialog>
        {/* 삭제 팝업 */}
        <Dialog open={openDelete} onClose={handleCloseDelete} maxWidth={false}>
            {/* <MaterialReg doFinish={handleRegDone} doCancle={handleCloseReg} /> */}
        </Dialog>
        {/* 이력 조회 화면 */}
        <Dialog open={openLog} onClose={handleCloseLog} maxWidth={false}>
            {/* <MaterialReg doFinish={handleRegDone} doCancle={handleCloseReg} /> */}
        </Dialog>
    </Box>
  )
}

export default UserManagement

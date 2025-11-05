import { useState, useEffect } from "react"
import { Box, Typography, type SelectChangeEvent } from '@mui/material'

// Components
import CustomTextField from "../component/CustomTextField"
import CustomButton from "../component/CustomButton"
import SearchBar from "../component/SearchBar"

// Table
import CommonTable from "../component/CommonTable"
import { getTestColumns, type TestRows } from '../Types/TableHeaders/TestHeaders'

// Search
import { getUserSearchCategory } from "../Types/Search"

function Test() {

  // TextField
  const [testData, setTestData] = useState({
    field1: "",
    field2: "",
  })
  const handleInputChange = (key: keyof typeof testData, value: string) => {
        setTestData((prev) => ({ ...prev, [key]: value }));
    };

  // Button
  const handleButtonClick = () => {
    alert('버튼 클릭')
  }

  // Table
  const [baseRows, setBaseRows] = useState<TestRows[]>([])
  useEffect(()=> {
    setBaseRows([
      {id: 1, data1: '테스트1', data2: '테스트2', data3: '테스트3'},
      {id: 2, data1: '테스트4', data2: '테스트5', data3: '테스트6'},
      {id: 3, data1: '테스트7', data2: '테스트8', data3: '테스트9'},
    ])
    
    setSearchList(getUserSearchCategory())

  }, [])

  const handleEdit = (row: TestRows) => console.log('수정', row);
  const handleDelete = (id: number) => console.log('삭제', id);

  const columns = getTestColumns({ handleEdit, handleDelete });

  // Search
  const [searchRows, setSearchRows] = useState<TestRows[]>([])
  const [isSearch, setIsSearch] = useState(false)
  const [searchList, setSearchList] = useState<{id:number, name: string, value: string}[]>([]) 
  const [selectedValue, setSelectedValue] = useState('data1')
  const [inputValue, setInputValue] = useState("")
  const [searchCount, setSearchCount] = useState<number|undefined>(undefined)

  // Input 변경
  const handleSearchChange = (value: string) => {
    setInputValue(value)
  }

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
      setSelectedValue(event.target.value)
      setInputValue("") // 컬럼 바뀌면 입력 초기화 
  }
  
  // 검색
  const handleSearch = () => {
    if (!selectedValue) return
    setIsSearch(true)
    const filtered = baseRows.filter((row) =>
      (row[selectedValue as keyof TestRows] as string)
        ?.toLowerCase()
        .includes(inputValue.toLowerCase())
    )
    setSearchRows(filtered)
    setSearchCount(filtered.length)
  }

  // 초기화
  const handleReset = () => {
    setSelectedValue("data1")
    setInputValue("")
    setIsSearch(false)
    setSearchRows(baseRows)
  }

  return (
    <Box sx={{ width: '100vw', height: '100vh'}}>
      <Typography sx={{
        color: 'black', fontSize: 40
      }}>테스트 페이지</Typography>
      {/*  */}
      <Box>
        <CustomTextField 
          label="라벨"
          variant="outlined"
          value={testData.field1}
          inputWidth="300px"
          disabled={false}
          readOnly={false}
          placeholder="테스트"
          type="text"
          onChange={(e) => handleInputChange('field1', e.target.value)}
        />
      </Box>
      {/*  */}
      <CustomButton text="클릭" onClick={handleButtonClick} />
      {/*  */}
      <SearchBar 
        options={searchList}
        selectValue={selectedValue}
        onSelectChange={handleSelectChange}
        label="검색"
        inputValue={inputValue}
        onInputChange={(e) => handleSearchChange(e.target.value)}
        onSearch={handleSearch}
        onReset={handleReset}
        searchCount={searchCount}
      />
      {/* 테이블 영역 */}
      <Box sx={{padding: 2}}>
          { isSearch ? (
              <CommonTable 
              columns={columns}
              rows={searchRows}
              />
          ) : (
              <CommonTable 
                  columns={columns}
                  rows={baseRows}
              />
          )}
      </Box>
    </Box>
  )
}

export default Test

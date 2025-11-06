import { Box } from "@mui/material"
import SearchBar from "../component/SearchBar"
import SearchResultBox from "../component/SearchResultBox"
import CustomButton from "../component/CustomButton"
import { getUserSearchCategory } from "../Types/Search"
import { useEffect, useState } from "react"
import { type TestRows } from "../Types/TableHeaders/TestHeaders"

export default function SearchHeader({ baseRows, setFilteredRows }: {
  baseRows: TestRows[]
  setFilteredRows: (rows: TestRows[]) => void
}) {
  const [searchList, setSearchList] = useState<{ id: number; name: string; value: string }[]>([])
  const [searchCount, setSearchCount] = useState<number | undefined>()

  useEffect(() => {
    setSearchList(getUserSearchCategory())
  }, [])

  // 🔹 SearchBar에서 전달된 검색 정보로 필터링만 수행
  const handleSearch = (searchInfo: { category: string; keyword: string }) => {
    const { category, keyword } = searchInfo
    if (!keyword.trim()) {
      setFilteredRows(baseRows)
      setSearchCount(undefined)
      return
    }

    const filtered = baseRows.filter((row) =>
      (row[category as keyof TestRows] as string)
        ?.toLowerCase()
        .includes(keyword.toLowerCase())
    )
    setFilteredRows(filtered)
    setSearchCount(filtered.length)
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        border: "1px solid #ccc",
        p: 2,
        borderRadius: 2,
      }}
    >
      <SearchResultBox searchCount={searchCount} />
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <SearchBar options={searchList} onSearch={handleSearch} />
        <CustomButton text="등록" height="40px" />
      </Box>
    </Box>
  )
}


// import { useState, useEffect } from "react"
// import { Box,  type SelectChangeEvent } from "@mui/material"
// import SearchBar from "../component/SearchBar"
// import SearchResultBox from "../component/SearchResultBox"
// // import CustomButton from "../component/CustomButton"
// import { getUserSearchCategory } from "../Types/Search"
// import { type TestRows } from "../Types/TableHeaders/TestHeaders"

// interface SearchHeaderProps {
//   baseRows: TestRows[];                        // 전체 데이터
//   setFilteredRows: (rows: TestRows[]) => void; // 결과를 부모로 전달
// }

// export default function SearchHeader({ baseRows, setFilteredRows }: SearchHeaderProps) {
//   // 상태
//   const [searchList, setSearchList] = useState<{ id: number; name: string; value: string }[]>([])
//   const [selectedValue, setSelectedValue] = useState("data1")
//   const [inputValue, setInputValue] = useState("")
//   const [searchCount, setSearchCount] = useState<number | undefined>(undefined)

//   // 검색 항목 초기 세팅
//   useEffect(() => {
//     setSearchList(getUserSearchCategory())
//   }, [])

//   // 입력 변경
//   const handleSearchChange = (value: string) => setInputValue(value)

//   // 셀렉트 변경
//   const handleSelectChange = (event: SelectChangeEvent<string>) => {
//     setSelectedValue(event.target.value)
//     setInputValue("") // 컬럼 바뀌면 입력 초기화
//   }

//   // 검색 실행
//   const handleSearch = () => {
//     if (!selectedValue || !inputValue.trim()) return

//     const filtered = baseRows.filter((row) =>
//       (row[selectedValue as keyof TestRows] as string)
//         ?.toLowerCase()
//         .includes(inputValue.toLowerCase())
//     )

//     setFilteredRows(filtered) //  부모로 전달
//     setSearchCount(filtered.length)
//   }

//   // 초기화
//   const handleReset = () => {
//     setSelectedValue("data1")
//     setInputValue("")
//     setFilteredRows(baseRows) // 부모 데이터로 복원
//     setSearchCount(undefined)
//   }

//   // 렌더링
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
        
//         minHeight: "100px",
//         backgroundColor: "whitesmoke",
//         border:'1px solid black',
//         padding:'10px'
        
//       }}
//     >
//     <SearchResultBox searchCount={searchCount}/>
//     <Box
//     sx={{display:"flex", flexDirection:"row", alignItems:'center', backgroundColor:'lightgray'}}>
//         <SearchBar
//         options={searchList}
//         selectValue={selectedValue}
//         onSelectChange={handleSelectChange}
//         label="검색"
//         inputValue={inputValue}
//         onInputChange={(e) => handleSearchChange(e.target.value)}
//         onSearch={handleSearch}
//         onReset={handleReset}
//         searchCount={searchCount}
//         />
        
//     </Box>
      
//     </Box>
//   )
// }

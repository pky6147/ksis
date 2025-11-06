import { Box } from "@mui/material"
import SearchBar from "../component/SearchBar"
import SearchResultBox from "../component/SearchResultBox"
// import CustomButton from "../component/CustomButton"
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
      </Box>
    </Box>
  )
}
//

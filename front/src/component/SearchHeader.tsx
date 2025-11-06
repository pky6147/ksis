import { Box } from "@mui/material"
import SearchBar from "../component/SearchBar"
import SearchResultBox from "../component/SearchResultBox"
import CustomButton from "../component/CustomButton"
import { type SearchCategory } from "../Types/Search"
import { useEffect, useState } from "react"


interface SearchHeaderProps<T> {
  baseRows: T[];
  setFilteredRows: React.Dispatch<React.SetStateAction<T[]>>;
  getSearchCategory: () => SearchCategory<keyof T>[];
}


export default function SearchHeader<T>({
  baseRows,
  setFilteredRows,
  getSearchCategory,
}: SearchHeaderProps<T>) {
  const [searchList, setSearchList] = useState<SearchCategory<keyof T>[]>([]);
  const [searchCount, setSearchCount] = useState<number | undefined>();

  useEffect(() => {
    // getSearchCategory는 외부 정의된 함수이므로, dependency 배열에 포함하지 않음
    setSearchList(getSearchCategory());
  }, []); // ✅ 빈 배열로 고정

  // 🔹 SearchBar에서 전달된 검색 정보로 필터링만 수행
  const handleSearch = (searchInfo: { category: keyof T; keyword: string }) => {
    const { category, keyword } = searchInfo;
    if (!keyword.trim()) {
      setFilteredRows(baseRows);
      setSearchCount(undefined);
      return;
    }

    const filtered = baseRows.filter((row) => {
      const value = row[category];
      return (
        typeof value === "string" &&
        value.toLowerCase().includes(keyword.toLowerCase())
      );
    });

    setFilteredRows(filtered);
    setSearchCount(filtered.length);
  };

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
        <SearchBar<keyof T> options={searchList} onSearch={handleSearch} />
        <CustomButton text="등록" height="40px" />
      </Box>
    </Box>
  )
}
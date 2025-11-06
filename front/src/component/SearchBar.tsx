import { useState } from "react"
import { Box, FormControl, Select, MenuItem, TextField, InputAdornment } from "@mui/material"
import CustomIconButton from "./CustomIconButton"
import CustomButton from "./CustomButton"
import { type SearchCategory } from "../Types/Search"

interface SearchBarProps<K extends string | number | symbol> {
  options: SearchCategory<K>[]
  onSearch?: (searchInfo: { category: K; keyword: string }) => void
}

export default function SearchBar<K extends string | number | symbol>({
  options,
  onSearch,
}: SearchBarProps<K>) {
  const [searchInfo, setSearchInfo] = useState<{ category: K; keyword: string }>({
    category: options[0]?.value ?? ("" as K),
    keyword: "",
  })

  const handleChange = (key: keyof typeof searchInfo, value: string) => {
    setSearchInfo((prev) => ({ ...prev, [key]: value }))
  }

  const handleSearch = () => {
    if (!searchInfo.keyword.trim()) return
    onSearch?.(searchInfo)
  }

  const handleReset = () => {
    const defaultCategory = options[0]?.value ?? ("" as K);
    setSearchInfo({ category: defaultCategory, keyword: "" });
    onSearch?.({ category: defaultCategory, keyword: "" });
  };

  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center", backgroundColor: "lightgray", p: 2, height:"50px", borderRadius: 2 }}>
      <FormControl sx={{ width: 120 }}>
        <Select
          value={searchInfo.category}
          onChange={(e) => handleChange("category", String(e.target.value))}
          sx={{ backgroundColor: "white", height: "40px" }}
        >
          {options.map(opt => (
            <MenuItem key={opt.id} value={String(opt.value)}>
              {opt.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        value={searchInfo.keyword}
        onChange={(e) => handleChange("keyword", e.target.value)}
        placeholder="검색어 입력"
        size="small"
        sx={{ backgroundColor: "white", flex: 1, borderRadius: 1 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <CustomIconButton icon="search" color='black' onClick={handleSearch} />
              <CustomIconButton icon="reset" color='black'  onClick={handleReset} />
            </InputAdornment>
            
          ),
        }}
      />
      <CustomButton text="등록" height="40px" />
    </Box>
  )
}





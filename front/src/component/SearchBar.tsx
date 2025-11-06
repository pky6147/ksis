import { useState } from "react"
import { Box, FormControl, Select, MenuItem, TextField, InputAdornment } from "@mui/material"
import CustomIconButton from "./CustomIconButton"

export default function SearchBar({ options, onSearch }: {
  options: { id: number; name: string; value: string }[]
  onSearch?: (searchInfo: { category: string; keyword: string }) => void
}) {
  const [searchInfo, setSearchInfo] = useState({ category: options[0]?.value || "", keyword: "" })

  const handleChange = (key: keyof typeof searchInfo, value: string) => {
    setSearchInfo((prev) => ({ ...prev, [key]: value }))
  }

  const handleSearch = () => {
    if (!searchInfo.keyword.trim()) return
    onSearch?.(searchInfo)
  }

  const handleReset = () => {
    setSearchInfo({ category: options[0]?.value || "", keyword: "" })
    onSearch?.({ category: "", keyword: "" })
  }

  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center", backgroundColor: "lightgray", p: 2, height:"50px", borderRadius: 2 }}>
      <FormControl sx={{ width: 120 }}>
        <Select
          value={searchInfo.category}
          onChange={(e) => handleChange("category", e.target.value)}
          sx={{ backgroundColor: "white", height: "40px" }}
        >
          {options.map(opt => (
            <MenuItem key={opt.id} value={opt.value}>{opt.name}</MenuItem>
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
    </Box>
  )
}







// import {useState, useEffect} from 'react'
// import {Box, TextField, FormControl, MenuItem, Select, type SelectChangeEvent} from '@mui/material'
// import CustomIconButton from './CustomIconButton'


// import {type SearchBar_Type} from '../Types/Components'

// export default function SearchBar(props: SearchBar_Type) {
//     const {
//       selectValue,
//       onSelectChange,
//       options,
//       label,
//       inputValue,
//       onInputChange,
//       onSearch,
//       onReset,
      
//     } = props

//     // 내부 상태(props 기반 초기값)
//     const [localSelect, setLocalSelect] = useState<string>(selectValue || "");
//     const [localInput, setLocalInput] = useState<string>(inputValue || "");

//     // props가 바뀌면 내부 state 동기화
//     useEffect(() => {
//       if (selectValue !== undefined && selectValue !== localSelect) {
//         setLocalSelect(selectValue);
//       }
//     }, [selectValue]);

//     useEffect(() => {
//       if (inputValue !== undefined && inputValue !== localInput) {
//         setLocalInput(inputValue);
//       }
//     }, [inputValue]);
    

//     // ✅ select 변경 시
//     const handleSelectChange = (event: SelectChangeEvent<string>) => {
//       const newValue = event.target.value;
//       setLocalSelect(newValue);

//       // // 선택된 항목에 따라 input 자동 업데이트 (선택적으로)
//       // const selectedOption = options.find((opt) => opt.value === newValue);
//       // if (selectedOption) {
//       //   setLocalInput("");
//       // }
//       setLocalInput(""); //선택 변경시 input초기화

//       // 외부에도 전달
//       onSelectChange?.(event);
//     };

//     // ✅ input 변경 시
//     const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
//       const newVal = e.target.value;
//       setLocalInput(newVal);
//       onInputChange?.(e);
//     };

//     // ✅ 초기화 시
//     const handleReset = () => {
//       setLocalSelect("");
//       setLocalInput("");
     
//       onReset?.();
//     };

//     return (
       
//             <Box
//                 sx={{
//                     // display: 'flex', alignItems: 'center',
//                     padding: 1, backgroundColor: 'gray', gap: 1,
//                     width:'500px', borderadius:'2',
//                 }}
//             >
//                 <Box sx={{ 
//                   display: 'flex', 
//                   alignItems: 'center',
//                   justifyContent:'center',
//                   padding: 1,
//                   flexDirection: 'row', 
                  
//                   gap: 1}}>
//                     <FormControl sx={{width: { xs: '100%', sm: '100px' }, height: '50px'}}>
//                         <Select
//                             onChange={handleSelectChange}
//                             value={localSelect}
//                             sx={{ height: '100%', backgroundColor: 'white', border: '1px solid'}}
//                         >
//                             {options.map(opt => (
//                                 <MenuItem key={opt.id} value={opt.value}>
//                                     {opt.name}
//                                 </MenuItem>
//                             ))}
//                         </Select>
//                     </FormControl>
//                     <TextField 
//                         sx={{backgroundColor: 'white', borderRadius: 1, border: '1px solid', width: '246px', minWidth: '246px' }}
//                         size= "small"
//                         value={localInput}
//                         label={label || ''}
//                         variant='standard'
//                         onChange={handleInputChange}
//                         placeholder={'검색어 입력'}
//                         inputProps={{ autoFocus: true }}
//                         type={'text'}
//                     />
//                     <CustomIconButton color='black' icon='search' width='45px'  height='45px' onClick={onSearch} />
//                     <CustomIconButton color='black' icon='reset'  width='45px'  height='45px' onClick={handleReset} />
//                 </Box>
                
//             </Box>

//     )
// }
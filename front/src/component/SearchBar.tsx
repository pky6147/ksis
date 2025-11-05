import {useState, useEffect} from 'react'
import {Box, TextField, Typography, FormControl, MenuItem, Select, type SelectChangeEvent} from '@mui/material'
import CustomIconButton from './CustomIconButton'

import {type SearchBar_Type} from '../Types/Components'

export default function SearchBar(props: SearchBar_Type) {
    const {
      selectValue,
      onSelectChange,
      options,
      label,
      inputValue,
      onInputChange,
      onSearch,
      onReset,
      searchCount,
    } = props

    // 내부 상태(props 기반 초기값)
    const [localSelect, setLocalSelect] = useState<string>(selectValue || "");
    const [localInput, setLocalInput] = useState<string>(inputValue || "");
    const [localCount, setLocalCount] = useState<number | undefined>(searchCount || undefined)

    // props가 바뀌면 내부 state 동기화
    useEffect(() => {
      if (selectValue !== undefined && selectValue !== localSelect) {
        setLocalSelect(selectValue);
      }
    }, [selectValue]);

    useEffect(() => {
      if (inputValue !== undefined && inputValue !== localInput) {
        setLocalInput(inputValue);
      }
    }, [inputValue]);
    
    useEffect(() => {
        setLocalCount(searchCount);
      
    }, [searchCount]);

    // ✅ select 변경 시
    const handleSelectChange = (event: SelectChangeEvent<string>) => {
      const newValue = event.target.value;
      setLocalSelect(newValue);

      // 선택된 항목에 따라 input 자동 업데이트 (선택적으로)
      const selectedOption = options.find((opt) => opt.value === newValue);
      if (selectedOption) {
        setLocalInput("");
      }

      // 외부에도 전달
      onSelectChange?.(event);
    };

    // ✅ input 변경 시
    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      const newVal = e.target.value;
      setLocalInput(newVal);
      onInputChange?.(e);
    };

    // ✅ 초기화 시
    const handleReset = () => {
      setLocalSelect("");
      setLocalInput("");
      setLocalCount(undefined);
      onReset?.();
    };

    return (
        <Box sx={{padding: 2}}>
            <Box 
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    minHeight: '140px',
                    height: '140px',
                    // backgroundColor: '#1e88e5',
                }}
            >
                {/* 검색결과? 영역 */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: 2,
                    backgroundColor: '#ccc',
                    color: 'black',
                    minWidth: '200px'
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {localCount !== undefined
                        ? '검색 결과'
                        : ''
                    }
                  </Typography>
                  <Typography variant="body1">
                    {localCount !== undefined
                      ? `총 ${localCount}건이 검색되었습니다.`
                      : ''}
                  </Typography>
                </Box>
                {/* 검색/초기화 버튼 영역 */}
                <Box
                    sx={{
                        display: 'flex', alignItems: 'center',
                        padding: 1, backgroundColor: '#ccc', gap: 1
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1}}>
                        <FormControl sx={{width: '246px', height: '45px', minWidth: '246px'}}>
                            <Select
                                onChange={handleSelectChange}
                                value={localSelect}
                                sx={{ height: '100%', backgroundColor: 'white', border: '1px solid'}}
                            >
                                {options.map(opt => (
                                    <MenuItem key={opt.id} value={opt.value}>
                                        {opt.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField 
                            sx={{backgroundColor: 'white', borderRadius: 1, border: '1px solid', width: '246px', minWidth: '246px' }}
                            size= "small"
                            value={localInput}
                            label={label || ''}
                            variant='standard'
                            onChange={handleInputChange}
                            placeholder={'검색어 입력'}
                            inputProps={{ autoFocus: true }}
                            type={'text'}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1}}>
                        <CustomIconButton color='black' icon='search' width='45px'  height='45px' onClick={onSearch} />
                        <CustomIconButton color='black' icon='reset'  width='45px'  height='45px' onClick={handleReset} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
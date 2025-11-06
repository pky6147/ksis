import {useState, useEffect} from 'react'
import { Box, Typography } from '@mui/material';


import {type SearchResultBox_Type} from '../Types/Components';
// type SearchResultBoxProps = {
//   searchCount?: number;
// };

export default function SearchResultBox({ searchCount }: SearchResultBox_Type) {
    


    const [localCount, setLocalCount] = useState<number>(searchCount??0);
    
    useEffect(() => {
            setLocalCount(searchCount?? 0);
          
        }, [searchCount]);

    return (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: 2,
                    backgroundColor: 'lightgrey',
                    color: 'black',
                    minWidth: '200px',
                    height:'50px',
                    borderRadius: 1,
              
                  }}
                >
                  {localCount>0&&(
                    <>
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
                    </>
                  )}
                  
                </Box>

      

    );
  }
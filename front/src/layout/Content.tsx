import React from 'react'
import {Box} from '@mui/material'
import  {type LayoutProps } from '../Types/Layout';

function Content({children}:LayoutProps) {
  
  return (
    <Box
        sx={{
            backgroundColor: '#fff',
            height: '98vh',
            border: '3px solid #3c3c3cff', 
            borderRadius: 3
        }}
    >
            {children}
    </Box>
  )
}

export default Content

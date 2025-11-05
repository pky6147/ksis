// import React from 'react'
import {Button} from '@mui/material'

import {type IconButton_Type} from '../Types/Components'

import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export default function CustomIconButton(props: IconButton_Type) {
    const {width, height, fontSize, color, fontWeight, backgroundColor, border, onClick, icon} = props

    switch (icon) {
        case 'search':
            return (
                <Button 
                    sx={{
                        width: width || '40px',
                        height: height || '30px',
                        color: color || 'white',
                        fontWeight: fontWeight || 'bold',
                        fontSize: fontSize || '16px',
                        backgroundColor: backgroundColor || '#fff',
                        border: border || '',
                        // borderRadius: 3,
                        // boxShadow: '0px 3px 0px black'
                    }}
                    onClick={onClick? onClick : ()=>{}}
                >
                    <SearchIcon />
                </Button>
            )
        case 'reset':
            return (
                <Button 
                    sx={{
                        width: width || '40px',
                        height: height || '30px',
                        color: color || 'white',
                        fontWeight: fontWeight || 'bold',
                        fontSize: fontSize || '16px',
                        backgroundColor: backgroundColor || '#fff',
                        border: border || '',
                        // borderRadius: 3,
                        // boxShadow: '0px 3px 0px black'
                    }}
                    onClick={onClick? onClick : ()=>{}}
                >
                    <RestartAltIcon />
                </Button>
            )
    }
}
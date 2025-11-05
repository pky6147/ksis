// import React from 'react'
import {IconButton} from '@mui/material'

import {type IconButton_Type} from '../Types/Components'

import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function CustomIconButton(props: IconButton_Type) {
    const {width, height, fontSize, color, fontWeight, backgroundColor, border, onClick, icon} = props

    switch (icon) {
        case 'search':
            return (
                <IconButton 
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
                </IconButton>
            )
        case 'reset':
            return (
                <IconButton 
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
                </IconButton>
            )
        case 'visible':
            return (
                <IconButton 
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
                    <Visibility />
                </IconButton>
            )
        case 'invisible':
            return (
                <IconButton 
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
                    <VisibilityOff />
                </IconButton>
            )
    }
}
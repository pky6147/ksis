import React from 'react'
import {Button} from '@mui/material'

import {type Button_Type} from '../Types/Components'

export default function CustomTextField(props: Button_Type) {
    const {width, height, fontSize, color, fontWeight, backgroundColor, border, onClick, text, startIcon, endIcon} = props
    return (
        <Button 
            sx={{
                width: width || '80px',
                height: height || '35px',
                color: color || 'white',
                fontWeight: fontWeight || 'bold',
                fontSize: fontSize || '16px',
                backgroundColor: backgroundColor || 'blue',
                border: border || '',
                // borderRadius: 3,
                // boxShadow: '0px 3px 0px black'
            }}
            onClick={onClick? onClick : ()=>{}}
            startIcon={startIcon}
            endIcon={endIcon}
        >
            {text || '버튼'}
        </Button>
    )
}
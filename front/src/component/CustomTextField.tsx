// import React from 'react'
import {Box, TextField} from '@mui/material'

import {type TextField_Type} from '../Types/Components'

export default function CustomTextField(props: TextField_Type) {
    const {value, label, variant, border, inputWidth, disabled, placeholder, readOnly, type, 
        onChange, startAdornment, endAdornment} = props
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: '320px'}}>
            <TextField 
                sx={{backgroundColor: 'white', borderRadius: 1, border: border || '1px solid', width: inputWidth || '246px', minWidth: '246px' }}
                size= "small"
                value={value || ''}
                label={label || ''}
                variant={variant || undefined}
                onChange={onChange}
                disabled={disabled || false}
                placeholder={placeholder || ''}
                inputProps={{ autoFocus: true }}
                slotProps={{
                    input: {
                      readOnly: readOnly || false,
                      startAdornment: startAdornment,
                      endAdornment: endAdornment,
                    },
                }}
                type={type || 'text'}
            />
        </Box>
    )
}
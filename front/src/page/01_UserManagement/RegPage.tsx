import {useState} from 'react'
import {Box, Typography, Button} from '@mui/material'

import { type UserTableRows } from '../../Types/TableHeaders/UserManageHeader'

interface RegPageProps {
    handleDone: () => void;
    handleCancle: () => void;
}

export default function RegPage(props: RegPageProps) {
    const {handleDone, handleCancle} = props

    const [target, setTarget] = useState<UserTableRows>()

    const handleRegist = () => {
        // 여기서 수정작업 
        console.log("Dialog 안 Edit", target)
        handleDone()
    }

    return (
        <Box>
            <Typography>{target? target.name : 'none'}</Typography>
            <Button onClick={handleRegist} >완료</Button>
            <Button onClick={handleCancle} >취소</Button>
        </Box>
    )
}
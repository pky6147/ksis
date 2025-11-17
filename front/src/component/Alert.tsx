import { type Alert_Type } from "../Types/Components"
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material'
import CustomButton from "./CustomButton"
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export default function Alert (props: Alert_Type) {
    const {open, text, onConfirm, onCancel} = props

    return (
        <Dialog 
            open={open} 
            onClose={onCancel} 
            disableAutoFocus
            disableRestoreFocus
        >
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, backgroundColor: '#FFF4E5' }}>
                <WarningAmberIcon color="warning" fontSize="large" />
                <Typography variant="h6" component="div">
                    알림
                </Typography>
            </DialogTitle>
            <DialogContent
                sx={{ 
                    marginTop: 2,
                    minWidth: 300,
                }}
            >
                <Typography variant="body1" color="text.primary">
                    {text}
                </Typography>
            </DialogContent>

            <DialogActions sx={{ paddingX: 3, paddingBottom: 2 }}>
                <CustomButton text="확인" onClick={onConfirm} radius={2}/>
                <CustomButton text="취소" onClick={onCancel} backgroundColor="#f0f0f0" radius={2}/>
            </DialogActions>
        </Dialog>
    )
}
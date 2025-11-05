import type { SelectChangeEvent } from '@mui/material'

export interface TextField_Type {
    // Input
    value?: number | string;
    label?: string;
    variant?: 'outlined' | 'filled' | 'standard' | undefined;
    inputWidth?: string;
    disabled?: boolean;
    // required?: boolean;
    placeholder?: string;
    readOnly?: boolean;
    type?: 'text' | 'number' | 'password';
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export interface Button_Type {
    width? : string;
    height? : string;
    fontSize? : string;
    color? : string;
    fontWeight? : string;
    backgroundColor? : string;
    border? : string;
    onClick? : React.MouseEventHandler<HTMLButtonElement>,
    text? : string;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
}
export interface IconButton_Type {
    width? : string;
    height? : string;
    fontSize? : string;
    color? : string;
    fontWeight? : string;
    backgroundColor? : string;
    border? : string;
    onClick? : React.MouseEventHandler<HTMLButtonElement>,
    icon?: 'search' | 'reset'
}

export interface SearchBar_Type {
    //SelectBox
    selectValue?: string;
    onSelectChange?: (event: SelectChangeEvent<string>) => void;
    options: {id: number, name: string; value: string}[];
    //TextField
    label?: string;
    inputValue?: string;
    onInputChange?: React.ChangeEventHandler<HTMLInputElement>;
    //IconButton Click Event
    onSearch? : () => void;
    onReset? : () => void;
    //Search Result
    searchCount?: number;
}
export interface SearchList_Type {
    id: number;
    name: string;
    value: string;
}

export const getTestSearchCategory = () => [
    {id: 1, name: 'A', value: 'data1'},
    {id: 2, name: 'B', value: 'data2'},
    {id: 3, name: 'C', value: 'data3'},
]

export const getUserSearchCategory = () => [
    {id: 1, name: '아이디', value: 'loginId'},
    {id: 2, name: '이름', value: 'name'},
    {id: 3, name: '부서', value: 'dept'},
    {id: 3, name: '직위', value: 'rank'},
    {id: 3, name: '접속일', value: 'loginAt'},
]
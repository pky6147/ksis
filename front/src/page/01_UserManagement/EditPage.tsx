import {useState} from 'react'
import {Box, Typography, InputAdornment, type SelectChangeEvent} from '@mui/material'
import CustomButton from '../../component/CustomButton';
import CustomTextField from '../../component/CustomTextField';
import CustomIconButton from '../../component/CustomIconButton';
import CustomSelect from '../../component/CustomSelect';
import Alert from '../../component/Alert';


import { type UserTableRows } from '../../Types/TableHeaders/UserManageHeader'

interface EditPageProps {
    row: UserTableRows | null;
    handleDone: () => void;
    handleCancel: () => void;
}

const mapStateValue = (state: string | undefined) => {
  switch(state) {
    case '승인완료':
      return 'Y';
    case '대기중':
      return 'N';
    default:
      return ''; // 빈값이나 기본값
  }
}

export default function EditPage(props: EditPageProps) {
    const {row, handleDone, handleCancel} = props
    const [isValid_id, setIsValid_id] = useState<boolean | null>(null);
    const [isValidPassword, setIsValidPassword] = useState<boolean | null>(null);
    const [isVisible, setIsVisible] = useState(false)
    const [isPasswordMismatch, setIsPasswordMismatch] = useState(false);
    const [newData, setNewData] = useState({
        loginId: row?.loginId || '',
        password: row?.password || '',
        passwordConfirm: '',
        name: row?.name || '',
        dept: row?.dept || '',
        rank: row?.rank || '',
        state: mapStateValue(row?.state),
    })
    const [openAlert, setOpenAlert] = useState(false)
    const stateList = [
        { value: 'Y', name: '승인' },
        { value: 'N', name: '대기중' },
    ];

    const handleShowPassword = () => {
        setIsVisible(!isVisible);
    }

    const handleInputChange = (key: keyof typeof newData, value: string) => {
        setNewData((prev) => {
            const updated = { ...prev, [key]: value };

            if (key === 'loginId') {
                if (value === '') {
                    setIsValid_id(null); // 입력이 없으면 검사 안함
                } else {
                    setIsValid_id(validateLoginId(value));
                }
            }

            if (key === 'password') {
              if (value === '') {
                setIsValidPassword(null);
              } else {
                setIsValidPassword(validatePassword(value));
              }
            }
            
            if (key === 'passwordConfirm' || key === 'password') {
                const mismatch = updated.password !== updated.passwordConfirm;
                setIsPasswordMismatch(mismatch);
            }

            return updated;
        });
    }

    const handleSelectChange = (key: keyof typeof newData) => 
    (event: SelectChangeEvent<string | number>) => {
      setNewData((prev) => ({ ...prev, [key]: event.target.value }));
    };

    const validateLoginId = (id: string): boolean => {
      const regex = /^[a-z0-9]{6,20}$/;
      return regex.test(id);
    };
    const validatePassword = (password: string): boolean => {
      if (password.length < 9) return false;

      let count = 0;
      if (/[A-Z]/.test(password)) count++;    // 영대문자
      if (/[a-z]/.test(password)) count++;    // 영소문자
      if (/[0-9]/.test(password)) count++;    // 숫자
      if (/[^A-Za-z0-9]/.test(password)) count++;  // 특수문자

      return count >= 3;
    };

    const handleEdit = () => {
        const password = newData.password;
        const passwordConfirm = newData.passwordConfirm;

        // 한글 포함 여부 검사
        const hasKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(password);
        const hasKoreanC = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(passwordConfirm);

        if (hasKorean || hasKoreanC) {
            console.log('hasKorean', hasKorean)
            console.log('hasKoreanC', hasKoreanC)
            alert('비밀번호에 한글은 포함될 수 없습니다.');
            return;
        }

        handleDone()
    }


    return (
        <Box sx={{
            width: '600px',
            height: '65vh',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>
            <Box sx={{bgcolor: '#FFC98B', display: 'flex', justifyContent: 'space-between'}}>
                <Typography sx={{fontSize: 48, fontWeight: 'bold', marginLeft: '20px'}}>사용자 등록</Typography>
                <CustomIconButton icon="close" backgroundColor='#FFC98B' onClick={()=>setOpenAlert(true)}/>
            </Box>
            <Box sx={{
                border: '2px solid #abababff',
                marginLeft: '20px',
                marginRight: '20px',
                borderRadius: 1,
                paddingTop: 1,
                paddingBottom: 1
            }}>
                {/* ID */}
                <Box sx={{display: 'flex', justifyContent: 'space-around', gap: 2, padding: 1}}>
                    <Box sx={{display: 'flex', justifyContent:'center', alignItems: 'center', borderRight: '1px solid', width: '200px'}}>
                        <Typography>아이디</Typography>
                        <Typography sx={{color: 'red'}}>*</Typography>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                        <CustomTextField 
                          variant="outlined"
                          value={newData.loginId}
                          inputWidth="300px"
                          disabled={false}
                          readOnly={false}
                          placeholder="아이디"
                          type="text"
                          onChange={(e) => handleInputChange('loginId', e.target.value)}
                        />
                        <Box sx={{ backgroundColor: '#c5c4c7', borderRadius:1, width: '300px'}}>
                            <Typography sx={{fontSize: 14}}>∴ 영문 소문자(a-z), 숫자(0~9) 조합으로 6자 이상 20자 이하 이어야 합니다.</Typography>
                            {isValid_id ? (
                                <Typography sx={{ color: 'green' }}>사용 가능한 아이디 형식입니다.</Typography>
                            ) : (
                              <Typography sx={{ color: 'red' }}>사용 불가능한 아이디 형식입니다.</Typography>
                            )}
                        </Box>
                    </Box>
                </Box>
                {/* 비밀번호 */}
                <Box sx={{display: 'flex', justifyContent: 'space-around', gap: 2, padding: 1}}>
                    <Box sx={{display: 'flex', justifyContent:'center', alignItems: 'center', borderRight: '1px solid', width: '200px'}}>
                        <Typography>비밀번호</Typography>
                        <Typography sx={{color: 'red'}}>*</Typography>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                        <CustomTextField 
                            variant="outlined"
                            value={newData.password}
                            inputWidth="300px"
                            disabled={false}
                            readOnly={false}
                            placeholder="비밀번호"
                            type={isVisible? 'text' : "password"}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            endAdornment={
                              <InputAdornment position="end">
                                { isVisible?
                                    (<CustomIconButton icon="invisible" width='20px' height='20px' color="gray" onClick={handleShowPassword} />) :
                                    (<CustomIconButton icon="visible"   width='20px' height='20px' color="gray" onClick={handleShowPassword} />) 
                                }
                              </InputAdornment>
                            }
                        />
                        <Box sx={{ backgroundColor: '#c5c4c7', borderRadius:1, width: '300px'}}>
                            <Typography sx={{fontSize:14}}>∴ 9자 이상의 영대문자, 영소문자, 숫자, 특수문자 중 3종류 이상의 조합만 가능합니다.</Typography>
                            {isValidPassword ? (
                                <Typography sx={{ color: 'green' }}>사용 가능한 비밀번호 형식입니다.</Typography>
                            ) : (
                                <Typography sx={{ color: 'red' }}>사용 불가능한 비밀번호 형식입니다.</Typography>
                            )}
                        </Box>
                    </Box>
                </Box>
                {/* 비밀번호 확인 */}
                <Box sx={{display: 'flex', justifyContent: 'space-around', gap: 2, padding: 1}}>
                    <Box sx={{display: 'flex', justifyContent:'center', alignItems: 'center', borderRight: '1px solid', width: '200px'}}>
                        <Typography>비밀번호 확인</Typography>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                        <CustomTextField 
                            variant="outlined"
                            value={newData.passwordConfirm}
                            inputWidth="300px"
                            disabled={false}
                            readOnly={false}
                            placeholder="비밀번호 확인"
                            type={isVisible? 'text' : "password"}
                            onChange={(e) => handleInputChange('passwordConfirm', e.target.value)}
                            endAdornment={
                              <InputAdornment position="end">
                                { isVisible?
                                    (<CustomIconButton icon="invisible" width='20px' height='20px' color="gray" onClick={handleShowPassword} />) :
                                    (<CustomIconButton icon="visible"   width='20px' height='20px' color="gray" onClick={handleShowPassword} />) 
                                }
                              </InputAdornment>
                            }
                        />
                        <Box sx={{ backgroundColor: '#c5c4c7', borderRadius:1, width: '300px', 
                            overflow: 'hidden', // 높이 줄이기 위해 꼭 필요
                            height: isPasswordMismatch  ? 'auto' : 0,
                            opacity: isPasswordMismatch  ? 1 : 0,
                            transition: 'all 0.3s ease', // 부드럽게 등장/사라짐
                        }}>
                            <Typography sx={{color: 'red', fontSize: 14}}>∴ 입력한 비밀번호가 다릅니다.</Typography>
                            <Typography sx={{color: 'red', fontSize: 14, whiteSpace: 'pre'}}>{'     '}비밀번호를 확인해주세요.</Typography>
                        </Box>
                    </Box>
                </Box>
                {/* 이름 */}
                <Box sx={{display: 'flex', justifyContent: 'space-around', gap: 2, padding: 1}}>
                    <Box sx={{display: 'flex', justifyContent:'center', alignItems: 'center', borderRight: '1px solid', width: '200px'}}>
                        <Typography>이름</Typography>
                        <Typography sx={{color: 'red'}}>*</Typography>
                    </Box>
                    <Box>
                        <CustomTextField 
                          variant="outlined"
                          value={newData.name}
                          inputWidth="300px"
                          disabled={false}
                          readOnly={false}
                          placeholder="이름"
                          type="text"
                          onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                    </Box>
                </Box>
                {/* 부서 */}
                <Box sx={{display: 'flex', justifyContent: 'space-around', gap: 2, padding: 1}}>
                    <Box sx={{display: 'flex', justifyContent:'center', alignItems: 'center', borderRight: '1px solid', width: '200px'}}>
                        <Typography>부서</Typography>
                    </Box>
                    <Box>
                        <CustomTextField 
                          variant="outlined"
                          value={newData.dept}
                          inputWidth="300px"
                          disabled={false}
                          readOnly={false}
                          placeholder="부서"
                          type="text"
                          onChange={(e) => handleInputChange('dept', e.target.value)}
                        />
                    </Box>
                </Box>
                {/* 직위 */}
                <Box sx={{display: 'flex', justifyContent: 'space-around', gap: 2, padding: 1}}>
                    <Box sx={{display: 'flex', justifyContent:'center', alignItems: 'center', borderRight: '1px solid', width: '200px'}}>
                        <Typography>직위</Typography>
                    </Box>
                    <Box>
                        <CustomTextField 
                          variant="outlined"
                          value={newData.rank}
                          inputWidth="300px"
                          disabled={false}
                          readOnly={false}
                          placeholder="직위"
                          type="text"
                          onChange={(e) => handleInputChange('rank', e.target.value)}
                        />
                    </Box>
                </Box>
                {/* 승인상태 */}
                <Box sx={{display: 'flex', justifyContent: 'space-around', gap: 2, padding: 1}}>
                    <Box sx={{display: 'flex', justifyContent:'center', alignItems: 'center', borderRight: '1px solid', width: '200px'}}>
                        <Typography>승인상태</Typography>
                        <Typography sx={{color: 'red'}}>*</Typography>
                    </Box>
                    <Box sx={{marginRight: '20px'}}>
                        <CustomSelect
                          value={newData.state}
                          listItem={stateList}
                          onChange={handleSelectChange('state')}
                        />
                    </Box>
                </Box>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'center', gap:2, marginBottom: 2}}>
                <CustomButton text="수정" onClick={handleEdit} radius={2}/>
                <CustomButton text="닫기" onClick={()=>setOpenAlert(true)} backgroundColor='#f0f0f0' radius={2}/>
            </Box>

            <Alert
              open={openAlert}
              text="정말로 닫으시겠습니까?"
              onConfirm={() => {
                setOpenAlert(false);
                handleCancel()
              }}
              onCancel={() => {
                setOpenAlert(false);
              }}
            />
        </Box>
    )
}
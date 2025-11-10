import {useState} from 'react'
import {Box, Typography, InputAdornment, type SelectChangeEvent, Stepper, Step, StepLabel } from '@mui/material'
import CustomButton from '../../component/CustomButton';
import CustomTextField from '../../component/CustomTextField';
import CustomIconButton from '../../component/CustomIconButton';
import CustomSelect from '../../component/CustomSelect';

interface RegPageProps {
    handleDone: () => void;
    handleCancle: () => void;
}

export default function RegPage(props: RegPageProps) {
    const {handleDone, handleCancle} = props
    const [activeStep, setActiveStep] = useState(0);
    const [newData, setNewData] = useState({
        settingName: '',
        userAgent: '',
        rate: '',
        url: '',
        type: '',
    })

    // Stepper
    const steps = ['기본 정보', '영역지정', '검토'];

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    // 🔹 robots.txt 상태 관리
    // const [robotsUrl, setRobotsUrl] = useState('');
    // const [robotsTxt, setRobotsTxt] = useState('');
    // const [robotsLoading, setRobotsLoading] = useState(false);
    // const [robotsError, setRobotsError] = useState('');

    const userAgentList = [
        { value: 'Windows / Edge', name: 'Windows / Edge' },
        { value: 'Windows / Chrome', name: 'Windows / Chrome' },
        { value: 'Mac / Chrome', name: 'Mac / Chrome' },
    ];
    const typeList = [
        { value: '단일', name: '단일' },
        { value: '다중', name: '다중' },
    ];

    const handleInputChange = (key: keyof typeof newData, value: string) => {
        setNewData((prev) => {
            const updated = { ...prev, [key]: value };

            return updated;
        });
    }

    const handleSelectChange = (key: keyof typeof newData) => 
    (event: SelectChangeEvent<string | number>) => {
      setNewData((prev) => ({ ...prev, [key]: event.target.value }));
    };

    const handleRegist = () => {
        handleDone()
    }

    /** ✅ robots.txt 확인 */
    const handleRobots = async () => {
        if (!newData.url) {
          alert('URL을 입력해주세요.');
          return;
        }

        // setRobotsTxt('');
        // setRobotsError('');
        // setRobotsLoading(true);

        // 여기에 백엔드 api를 입력해야됨. 프론트에서 하려니 CORS정책때문에 불가능
        
    }


    return (
        <Box sx={{
            width: '1200px',
            height: '65vh',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>
            <Box sx={{borderBottom: '1px solid black', display:'flex', justifyContent: 'space-between'}}>
                <Typography sx={{fontSize: 64, fontWeight: 'bold', marginLeft: '20px'}}>데이터 수집 설정</Typography>
                <Box sx={{display: 'flex', flexDirection: 'row-reverse'}}>
                    <CustomIconButton icon="close" color="red" onClick={handleCancle} />
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => (
                        <Step key={label} completed={activeStep > index}>
                            <StepLabel
                                sx={{
                                    '& .MuiStepIcon-root': {
                                      color: activeStep === index ? '#F5A623' : '#555555',
                                    },
                                    '& .MuiStepLabel-label': {
                                        color:
                                          activeStep === index
                                            ? '#F5A623' // 🔹 현재 단계 색상
                                            : '#555555', // ⚪ 비활성 단계 색상
                                        fontWeight: activeStep === index ? 'bold' : 'normal',
                                        borderBottom: activeStep === index ? '2px solid #F5A623' : 'none',
                                    },
                                }}
                            >
                                {label}</StepLabel>
                        </Step>
                        ))}
                    </Stepper>
                </Box>
            </Box>

            {activeStep === 0 && (
            <Box sx={{
                border: '2px solid #abababff',
                marginLeft: '20px',
                marginRight: '20px',
                paddingTop: 1,
                paddingBottom: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: 1
            }}>
                {/* 데이터 수집명 */}
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1, width: '100%'}}>
                    <Typography sx={{paddingLeft: 2, width: '20%'}}>데이터 수집명</Typography>
                    <CustomTextField 
                      value={newData.settingName}
                      inputWidth="330px"
                      disabled={false}
                      readOnly={false}
                      placeholder="데이터 수집명"
                      type="text"
                      onChange={(e) => handleInputChange('settingName', e.target.value)}
                    />
                </Box>
                {/* User-Agent */}
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1, width: '100%'}}>
                    <Typography sx={{paddingLeft: 2, width: '20%'}}>User-Agent</Typography>
                    <CustomSelect
                        inputWidth="330px"
                        value={newData.userAgent}
                        listItem={userAgentList}
                        onChange={handleSelectChange('userAgent')}
                    />
                </Box>
                {/* 수집간격 */}
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1, width: '100%'}}>
                    <Typography sx={{paddingLeft: 2, width: '20%'}}>데이터 수집간격(ms)</Typography>
                    <CustomTextField 
                      value={newData.rate}
                      inputWidth="330px"
                      disabled={false}
                      readOnly={false}
                      placeholder="데이터 수집간격(ms)"
                      type="number"
                      step={10}
                      onChange={(e) => handleInputChange('rate', e.target.value)}
                    />
                </Box>
                {/* URL */}
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1, width: '100%'}}>
                    <Typography sx={{paddingLeft: 2, width: '20%'}}>Domain URL</Typography>
                    <CustomTextField 
                        value={newData.url}
                        inputWidth="395px"
                        disabled={false}
                        readOnly={false}
                        placeholder="URL"
                        type="text"
                        onChange={(e) => handleInputChange('url', e.target.value)}
                        startAdornment={
                            <InputAdornment position="start" sx={{marginLeft: '-13px'}}>
                                <CustomSelect
                                    inputWidth="80px"
                                    value={newData.type}
                                    listItem={typeList}
                                    onChange={handleSelectChange('type')}
                                />
                            </InputAdornment>  
                        }
                        endAdornment={
                            <InputAdornment position="end" sx={{marginRight: '-14px'}}>
                                <CustomButton width='40px' height='40px' 
                                    text={'검증'}
                                    // text={robotsLoading ? '확인중' : '검증'}
                                    onClick={handleRobots} 
                                    // disabled={robotsLoading}
                                />
                            </InputAdornment>
                        }
                    />
                </Box>
            </Box>
            /* robots.txt 결과 */
            /* {(robotsTxt || robotsError) && (
              <Box sx={{ mt: 1, ml: 10 }}>
                {robotsUrl && (
                  <Typography variant="body2" color="primary">
                    확인 주소: {robotsUrl}
                  </Typography>
                )}
                {robotsError && (
                  <Typography variant="body2" color="error">
                    ⚠️ {robotsError}
                  </Typography>
                )}
                {robotsTxt && (
                  <Paper
                    sx={{
                      mt: 1,
                      p: 1,
                      maxHeight: 150,
                      overflowY: 'auto',
                      whiteSpace: 'pre-wrap',
                      fontFamily: 'monospace',
                      fontSize: 13,
                      bgcolor: '#f9f9f9',
                    }}
                  >
                    {robotsTxt}
                  </Paper>
                )}
              </Box>
            )} */
            )}

            {/* 나중에 step 1, 2 단계 추가할 자리 */}
            {activeStep === 1 && (
              <Box sx={{ mx: 2, p: 3 }}>
                <Typography>영역 지정 단계 화면 구성 예정</Typography>
              </Box>
            )}
            {activeStep === 2 && (
              <Box sx={{ mx: 2, p: 3 }}>
                <Typography>검토 및 등록 단계 화면 구성 예정</Typography>
              </Box>
            )}

            <Box sx={{display: 'flex', justifyContent: 'center', gap:2, marginBottom: 2}}>
                {activeStep > 0 && <CustomButton text="이전" onClick={handleBack} />}
                {activeStep < steps.length - 1 ? (
                    <>
                        <CustomButton text="다음" onClick={handleNext} />
                    </>
                ) : (
                    <>
                        <CustomButton text="등록" onClick={handleRegist} />
                        {/* <CustomButton text="닫기" onClick={handleCancle} /> */}
                    </>
                )}
            </Box>
        </Box>
    )
}
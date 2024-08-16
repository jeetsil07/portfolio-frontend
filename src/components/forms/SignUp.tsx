import { Button, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { primaryColor, secondaryColor } from '../../util/constant'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useRegisterUserMutation } from '../../services/UserRegistration.service';


const SignUp = () => {
    const [userRegisterData, setUserRegisterData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    })
    const [cpass, setcpass] = useState('')
    const [passError, setPassError] = useState('')
    const [passwordFieldType, setPasswordFieldType] = useState('password')
    const [cpasswordFieldType, setCpasswordFieldType] = useState('password')
    const [fieldError, setFieldError] = useState('')

    const handleRegisterData = (field: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUserRegisterData(prevState => ({
            ...prevState, // Preserve the existing fields
            [field]: e.target.value // Update the specific field (email or password)
        }));
    };
    const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setcpass(e.target.value)


    };

    useEffect(() => {
        if (cpass === userRegisterData.password) {
            console.log('same')
            setPassError('')
        }
        if (cpass !== userRegisterData.password) {
            console.log(cpass)
            setPassError('Please Confirm the Password')
        }
    }, [cpass, userRegisterData.password])

    const [userRegister] = useRegisterUserMutation();

    const handleRegisterSubmit = async () => {
        try {
            if (userRegisterData.first_name === '' || userRegisterData.last_name === '' || userRegisterData.email === '' || userRegisterData.password === '') {
                setFieldError('All Fields are required')
                return;
            }
            if (passError !== '') {
                return;
            }
            if (userRegisterData.first_name === '' && userRegisterData.last_name === '' && userRegisterData.email === '' && userRegisterData.password === '') {
                setFieldError('')
            }
            const response = await userRegister(userRegisterData).unwrap();
            console.log(response,'register')
        } catch (error: any) {
            console.error('Failed to login:', error);
        }
    }
    return (
        <>
            <Paper elevation={3}
                sx={{
                    padding: "10px !important"
                }}
            >
                <Typography variant="h5" my={2} color={secondaryColor}>Sign up</Typography>
                {
                    fieldError !== '' && <Typography variant="caption" color={secondaryColor}>{fieldError}</Typography>
                }
                <TextField
                    autoComplete='off'
                    variant='outlined'
                    placeholder='Enter User First Name'
                    label={'First Name'}
                    fullWidth
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: `${primaryColor}`, // Set outline color
                            },
                            '&:hover fieldset': {
                                borderColor: `${primaryColor}`, // Set outline color on hover
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: `${primaryColor}`, // Set outline color when focused
                            },
                        },
                    }}
                    InputProps={{
                        style: {
                            color: `${primaryColor}`,
                        },
                    }}
                    InputLabelProps={{
                        style: { color: `${primaryColor}` } // Change the color of the label
                    }}
                    onChange={(e) => handleRegisterData('first_name', e)}
                    value={userRegisterData.first_name}
                />

                <TextField
                    autoComplete='off'
                    variant='outlined'
                    placeholder='Enter User Last Name'
                    label={'Last Name'}
                    fullWidth
                    sx={{
                        marginTop: '15px',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: `${primaryColor}`, // Set outline color
                            },
                            '&:hover fieldset': {
                                borderColor: `${primaryColor}`, // Set outline color on hover
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: `${primaryColor}`, // Set outline color when focused
                            },
                        },
                    }}
                    InputProps={{
                        style: {
                            color: `${primaryColor}`,
                        },
                    }}
                    InputLabelProps={{
                        style: { color: `${primaryColor}` } // Change the color of the label
                    }}
                    onChange={(e) => handleRegisterData('last_name', e)}
                    value={userRegisterData.last_name}
                />
                <TextField
                    autoComplete="new-email"
                    variant='outlined'
                    placeholder='Enter User Valid Email'
                    label={'Email'}
                    fullWidth
                    sx={{
                        marginTop: '15px',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: `${primaryColor}`, // Set outline color
                            },
                            '&:hover fieldset': {
                                borderColor: `${primaryColor}`, // Set outline color on hover
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: `${primaryColor}`, // Set outline color when focused
                            },
                        },
                    }}
                    InputProps={{
                        style: {
                            color: `${primaryColor}`,
                        },
                    }}
                    InputLabelProps={{
                        style: { color: `${primaryColor}` } // Change the color of the label
                    }}
                    onChange={(e) => handleRegisterData('email', e)}
                    value={userRegisterData.email}
                />
                <TextField
                    autoComplete="new-password"
                    variant='outlined'
                    placeholder='Add Password'
                    type={passwordFieldType}
                    label={'Password'}
                    fullWidth
                    sx={{
                        marginTop: '15px',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: `${primaryColor}`, // Set outline color
                            },
                            '&:hover fieldset': {
                                borderColor: `${primaryColor}`, // Set outline color on hover
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: `${primaryColor}`, // Set outline color when focused
                            },
                        },
                    }}
                    InputProps={{
                        style: {
                            color: `${primaryColor}`,
                        },
                        endAdornment: (
                            <InputAdornment position="end">
                                {passwordFieldType === 'password' ? (
                                    <IconButton onClick={() => setPasswordFieldType('text')}>
                                        <VisibilityIcon style={{ color: primaryColor }} />
                                    </IconButton>
                                ) : (
                                    <IconButton onClick={() => setPasswordFieldType('password')}>
                                        <VisibilityOffIcon style={{ color: secondaryColor }} />
                                    </IconButton>
                                )}

                            </InputAdornment>
                        )
                    }}
                    InputLabelProps={{
                        style: { color: `${primaryColor}` } // Change the color of the label
                    }}
                    onChange={(e) => handleRegisterData('password', e)}
                    value={userRegisterData.password}
                />
                <TextField
                    autoComplete='off'
                    variant='outlined'
                    placeholder='Confirm Password'
                    label={'Confirm Password'}
                    type={cpasswordFieldType}
                    fullWidth
                    helperText={passError}
                    sx={{
                        marginY: '15px',
                        '& .MuiFormHelperText-root': {
                            color: 'red', // Change this to your desired color
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: `${primaryColor}`, // Set outline color
                            },
                            '&:hover fieldset': {
                                borderColor: `${primaryColor}`, // Set outline color on hover
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: `${primaryColor}`, // Set outline color when focused
                            },
                        },
                    }}
                    InputProps={{
                        style: {
                            color: `${primaryColor}`,
                        },
                        endAdornment: (
                            <InputAdornment position="end">
                                {cpasswordFieldType === 'password' ? (
                                    <IconButton onClick={() => setCpasswordFieldType('text')}>
                                        <VisibilityIcon style={{ color: primaryColor }} />
                                    </IconButton>
                                ) : (
                                    <IconButton onClick={() => setCpasswordFieldType('password')}>
                                        <VisibilityOffIcon style={{ color: secondaryColor }} />
                                    </IconButton>
                                )}

                            </InputAdornment>
                        )
                    }}
                    InputLabelProps={{
                        style: { color: `${primaryColor}` } // Change the color of the label
                    }}
                    onChange={(e) => handleConfirmPassword(e)}
                    value={cpass}
                />

                <Button
                    variant='contained'
                    sx={{
                        backgroundColor: `${primaryColor}`,
                        width: '100%',
                        '&:hover': {
                            backgroundColor: `${secondaryColor}`,
                        }
                    }}
                    onClick={handleRegisterSubmit}
                >Sign in</Button>
            </Paper>
        </>
    )
}

export default SignUp
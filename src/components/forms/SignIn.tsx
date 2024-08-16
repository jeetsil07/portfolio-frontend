import { Button, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { primaryColor, secondaryColor } from '../../util/constant'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useLoginUserMutation } from '../../services/login.service';
import routes from '../../util/routes';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const navigate = useNavigate()
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })
    const [fieldError, setFieldError] = useState('')
    const [passwordFieldType, setPasswordFieldType] = useState('password')

    const handleLoginData = (field: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLoginData(prevState => ({
            ...prevState, // Preserve the existing fields
            [field]: e.target.value // Update the specific field (email or password)
        }));
    };

    const [userLogin] = useLoginUserMutation();

    const handleLoginSubmit = async() => {
        try {
            if(loginData.email === '' || loginData.password === ''){
                setFieldError('All Fields are required')
                return;
            }
            if(loginData.email !== '' && loginData.password !== ''){
                setFieldError('')
            }
            const response = await userLogin(loginData).unwrap();
            localStorage.setItem('authTokens', JSON.stringify(response.data)); // Store the token
            // Proceed with further actions like redirecting or fetching user data
            navigate(routes.profile)
        } catch (error:any) {
            setFieldError(error.data.data.non_field_errors[0])
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
                <Typography variant="h5" my={2} color={secondaryColor}>Sign in</Typography>
                {
                    fieldError !== '' && <Typography variant="caption" color={secondaryColor}>{fieldError}</Typography>
                }
                <TextField
                    variant='outlined'
                    placeholder='Enter User Valid Email'
                    label={'Email'}
                    fullWidth
                    sx={{
                        marginTop: '5px',
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
                        }
                    }}
                    InputLabelProps={{
                        style: { color: `${primaryColor}` } // Change the color of the label
                    }}
                    onChange={(e) => handleLoginData('email', e)}
                    value={loginData.email}
                />
                <TextField
                    variant='outlined'
                    type={passwordFieldType}
                    placeholder='Enter Valid Password'
                    label={'Password'}
                    fullWidth
                    sx={{
                        marginY: '15px',
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
                    onChange={(e) => handleLoginData('password', e)}
                    value={loginData.password}
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
                    onClick={handleLoginSubmit}
                >Sign in</Button>
            </Paper>
        </>
    )
}

export default SignIn
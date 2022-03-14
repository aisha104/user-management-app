import {useNavigate} from 'react-router-dom'
// import Button from './shared/Button'
import {useState} from 'react'
import Swal from 'sweetalert2'
import jwt_decode from "jwt-decode"

import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button' 
import TextField from '@mui/material/TextField'

function Login() {
  
    const [email, setEmail] = useState();
    
    const [password, setPassword] = useState();   

    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await loginUser({
            email,
            password
        });  
        
        if(response.token)
        {
            localStorage.setItem('token', response.token);   
            const data = jwt_decode(response.token);  
            Swal.fire({  
                text: 'Login success',
                icon: 'success',
                position: 'top-end',
                timer: 1500,
                showConfirmButton: false,
            }); 
            if(data["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == "Administrator")
            {
                navigate('/admin')
            } 
            else if(data["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == "Manager")
            {
                navigate('/manager')
            }           

            else {
                navigate('/user')
            }            
        }
        else {
            Swal.fire({  
                text: 'Please enter valid login credentials',
                icon: 'error',
                position: 'top-end',
                timer: 1500,
                showConfirmButton: false,
            }); 
        }
    } 

    async function loginUser(credentials) {
        return fetch('https://localhost:44324/api/Account/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
        })
        .then(data => data.json())
    }

    
    return (
        <>
            <CssBaseline />
            <Box
                 sx={{
                    marginTop: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
            >
                <Avatar sx={{ m: 1, mt: 5, color: 'green' }}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography variant="h5" color="secondary">
                    Login
                </Typography>

                <Box sx={{ mt: 2 }}>
                    <form onSubmit={handleSubmit}>
                        <TextField fullWidth required id="standard-basic" label="Email" variant="standard" 
                            type="email"
                            name="email" 
                            onChange={e => setEmail(e.target.value)}
                        />

                        <TextField fullWidth required id="standard-basic" label="Password" variant="standard"  
                            type="password" 
                            name="password"
                            onChange={e => setPassword(e.target.value)}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                            >
                                Login
                        </Button>
                    </form> 
                </Box>
               
                <Typography align="center">
                    <Button href="/" variant="outlined" color="primary" sx={{ my: 1, mx: 1.5}}>
                        Return to Home
                    </Button>
                </Typography>
            </Box>            
        </>
    )
}
export default Login

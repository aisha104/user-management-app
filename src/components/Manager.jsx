import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'

import CssBaseline from '@mui/material/CssBaseline'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import {Typography} from '@mui/material'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

function Manager() {
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    
    function Logout() {
        localStorage.clear();
        navigate('/login')
    }

    function handleLogout(e) {
        e.preventDefault();
        Swal.fire({
            title: 'Do you want to logout?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Logout'
            }).then((result) => {
                if (result.isConfirmed) {
                    Logout();
            }
        })       
    }         

    return (
        <>
            <CssBaseline />
            <Box
                sx={{
                marginTop: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
                <Avatar sx={{ bgcolor: "#9400D3" }}>M</Avatar>

                <Typography  variant="h6">
                    Manager
                </Typography>                   
            </Box>

            <Box
                sx={{
                    width: '100%', 
                    maxWidth: 300, 
                }}
            >
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <Link href="/leaveRequests" underline="none" color="secondary"> 
                                <ListItemText primary="Leave Requests" />
                            </Link>     
                        </ListItemButton>
                    </ListItem>                
                </List>          
            </Box>
              
        <Box 
            sx={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
             }}
        >
            <form onSubmit={handleLogout}>
                <Button variant="contained" type="submit" color="primary" sx={{ mt: 3, mb: 2 }}>Logout</Button>
            </form>
        </Box>
    </>
    )
}

export default Manager

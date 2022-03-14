import homebanner from '../Images/homebanner.png'
import user1 from '../Images/user1.jpg'
import user2 from '../Images/user2.jpg'
import user3 from '../Images/user3.jpg'
import user4 from '../Images/user4.jpg'

import {Typography, Button, Box, CssBaseline} from '@mui/material'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'

function Homepage() {
    console.log({homebanner});
    return (
            <>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 20,
                        marginLeft: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <AvatarGroup max={4}>
                        <Avatar alt="Image 1" src={user1} sx={{ width: 66, height: 66 }}/>
                        <Avatar alt="Image 2" src={user2} sx={{ width: 66, height: 66 }} />
                        <Avatar alt="Image 3" src={user3} sx={{ width: 66, height: 66 }} />
                        <Avatar alt="Image 4" src={user4} sx={{ width: 66, height: 66 }} />
                    </AvatarGroup>

                    <Typography variant="h4">
                        Welcome to                     
                    </Typography>

                    <Typography variant="h4">
                        User Management App                   
                    </Typography>

                    <Typography variant="h6">
                        Use the below link to login to your account
                    </Typography>
                
                    <Typography align="center">
                        <Button href="/Login" variant="outlined" color="primary" sx={{ my: 1, mx: 1.5}}>
                            Login
                        </Button>
                    </Typography>
                </Box>   
            </>
    )
}

export default Homepage

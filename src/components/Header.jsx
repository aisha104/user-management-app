import {GlobalStyles, AppBar, Toolbar, Typography} from '@mui/material'
function Header() {
    return (
       
        <>
            <GlobalStyles />
            <AppBar color="secondary">
                <Toolbar>
                    <Typography variant='h5' color="primary">
                        User Management App
                    </Typography>                    
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Header

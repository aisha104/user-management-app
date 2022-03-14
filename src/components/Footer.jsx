import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link href="/">
                User Management App
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}  
    
function Footer() {
    return (
        <Box>
            <CssBaseline />
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Box>
    )
}

export default Footer

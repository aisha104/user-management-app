import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import IconButton from '@mui/material/IconButton'
import PreviewIcon from '@mui/icons-material/Preview'

function LeaveRequests() {
    
    const[requests, setRequests] = useState([]);

    const navigate = useNavigate();

    function getRequests() {
        return fetch('https://localhost:44324/api/LeaveRequest')
        .then(data => data.json())
    }

    useEffect( () => {
        let mounted = true;
        getRequests()
        .then(items => {
            if(mounted){
                setRequests(items)
            }
        })
        return () => mounted = false;
    }, [])

    function handleRequest(id)
    {
        navigate('/leaveRequestDetails/'+id);
    }
    
    return (
        <>
            <CssBaseline />
            <Box
                 sx={{
                    marginTop: 10,                    
                    marginLeft: 3,
                    marginRight: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
            >

                <Typography variant="h5" color="secondary" sx={{ mb: 2 }}>
                    Leave Request List
                </Typography>

                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>User ID</TableCell>
                                <TableCell>Note</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {requests.map((item) => (
                                <TableRow
                                    key={item.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {item.userId}
                                </TableCell>
                                <TableCell>{item.note}</TableCell>
                                <TableCell>
                                    <IconButton edge="end" aria-label="comments" onClick={handleRequest.bind(this,item.id)}>
                                        <PreviewIcon sx={{ color: '#22a0b1' }}/>
                                    </IconButton>
                                </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
               
                <Typography align="center">
                    <Button href="/manager" variant="outlined" color="primary" sx={{ my: 1, mx: 1.5}}>
                        Return to Home
                    </Button>
                </Typography>
            </Box>            
        </>
    )
}

export default LeaveRequests

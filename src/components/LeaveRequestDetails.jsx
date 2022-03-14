import Swal from 'sweetalert2'
import {useState, useEffect} from 'react'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import {useParams} from 'react-router-dom'

import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { CardActionArea } from '@mui/material'

function LeaveRequestDetails() {
    const {id} = useParams();

    const initialValue = {id:id, remarks:"", leaveStatusId:""};

    const [formValues, setFormValues] = useState(initialValue);

    const [requestDetails, setRequestDetails] = useState({});

    const [formErrors, setFormErrors] = useState({});

    const token = localStorage.getItem('token')      
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({ ...formValues, [name]: value });
    };    

    function getRequestDetails() {
        return fetch('https://localhost:44324/api/LeaveRequest/'+id)
        .then(data => data.json())
    }

    useEffect( () => {
        let mounted = true;
        getRequestDetails()
        .then(item => {
            if(mounted){
                setRequestDetails(item)
            }
        })
        return () => mounted = false;
    }, [])

  
    const handleSubmit = async (e) =>{
        e.preventDefault();
        setFormErrors(Validate(formValues));
        const response = await changeStatus({
            id: formValues.id,
            remarks: formValues.remarks,
            leaveStatusId: formValues.leaveStatusId
            
        });

        if(response.status == 204)
        {
            Swal.fire({  
                text: 'Status updated successfully',
                icon: 'success',
                position: 'top-end',
                timer: 1500,
                showConfirmButton: false,
            });
            setFormValues(initialValue);
        }
    }

    const Validate = (values) => {
        const errors = {};

        if(!values.remarks) 
            { errors.remarks = "Remarks is required"; }
        
        return errors;
    };

    async function changeStatus (formData) {
        return  fetch("https://localhost:44324/api/LeaveRequest/review", {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            },
            body: JSON.stringify(formData),
        })
    }

    return (
        <>        
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 10,
                    marginLeft: 10,
                    marginRight: 10,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography variant="h5" color="secondary" sx={{ mb:3 }}>
                    Leave Request Details
                </Typography>

                <Card>
                    <CardActionArea>
                        <CardContent>

                            <Typography sx={{ mb: 1.5 }} component="div">
                                Start :
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                                {requestDetails.start}
                            </Typography>

                            <Typography sx={{ mb: 1.5 }} component="div">
                                End :
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                                {requestDetails.end}
                            </Typography>

                            <Typography sx={{ mb: 1.5 }} component="div">
                                Note :
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                                {requestDetails.note}
                            </Typography>

                            <Typography sx={{ mb: 1.5 }} component="div">
                                Leave Type :
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                                {requestDetails.leaveTypeId}
                            </Typography>

                            <Typography sx={{ mb: 1.5 }} component="div">
                                User Id :
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                                {requestDetails.userId}
                            </Typography>

                        </CardContent>
                    </CardActionArea>
                </Card>

                <Box
                    sx={{
                        marginTop: 3,
                    }}
                >
                    <form onSubmit={handleSubmit}>
                        <TextField label="ID" variant="standard"
                            type="hidden"  
                            name="id"
                            value={formValues.id} 
                            onChange={handleChange}
                        />

                        <TextField fullWidth label="Remarks" variant="standard"  
                            type="text" 
                            name="remarks"
                            value={formValues.remarks}
                            onChange={handleChange}
                        />
                        <Typography variant="h6" color="error">{formErrors.remarks}</Typography>

                        <Box 
                            sx={{ 
                                marginTop: 2
                            }}
                        >
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="leaveStatusId"
                                    onChange={handleChange} 
                                >
                                    <FormControlLabel value="1" control={<Radio />} label="Approved" />
                                    <FormControlLabel value="2" control={<Radio />} label="Denied" />
                                </RadioGroup>
                            </FormControl>
                        </Box>                       

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                            >
                                Change
                        </Button>
                    </form> 
                </Box>    
                
                <Typography align="center">
                    <Button href="/manager" variant="outlined" color="primary" sx={{ my: 1, mx: 1.5}}>
                        Return to Home
                    </Button>
                </Typography>
            </Box>  
        </>
    )
}

export default LeaveRequestDetails

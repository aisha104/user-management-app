import {useState} from 'react'
import Swal from 'sweetalert2'
import TextField from '@mui/material/TextField'

import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid';

function CreateLeaveRequest() {
    const initialValue = {start:"", end:"", note:"", leaveTypeId:"", userId:""}

    const[formValues, setFormValues] = useState(initialValue);

    const[formErrors, setFormErros] = useState({});

    const token = localStorage.getItem('token');

    const handleChange = (e) => {
        const{name, value} = e.target;
        setFormValues({...formValues, [name]: value});        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErros(validate(formValues));
        const response = await createRequest({
            start: formValues.start,
            end: formValues.end,
            note: formValues.note,
            leaveTypeId: formValues.leaveTypeId,
            userId: formValues.userId
        });

        if(response.status == 202)
        {
            Swal.fire({  
                text: 'Request submitted successfully',
                icon: 'success',
                position: 'top-end',
                timer: 1500,
                showConfirmButton: false,
            });
            setFormValues(initialValue);
        }
    }

    const validate = (values) => {
        const errors = {};

        if(!values.start)
            { errors.start = "Start date is required"; }
        if(!values.end)
            { errors.end = "End date is reuired"; }
        if(!values.note)
            { errors.note = "Leave note is required"; }
        if(!values.leaveTypeId)
            { errors.leaveTypeId = "Leave type id is required"; }

        return errors;
    };
    
    async function createRequest(formData){
        return fetch("https://localhost:44324/api/LeaveRequest/create",{
            method: "POST",
            headers: {
                'content-Type': 'application/json',
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
                    marginTop: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
            >
                <Typography variant="h5" color="secondary">
                    Create Leave Request
                </Typography>

                <Box sx={{ mt: 2, width: '75%' }}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                            <TextField fullWidth id="standard-basic" variant="standard" 
                                type="date"
                                name="start" 
                                value={formValues.start}
                                onChange={handleChange}                                
                            />                            
                            <Typography variant="h6" color="error">{formErrors.start}</Typography> 
                            </Grid>
                            

                            <Grid item xs={12} sm={6}>
                            <TextField fullWidth id="standard-basic" variant="standard" 
                                type="date" 
                                name="end"  
                                value={formValues.end}
                                onChange={handleChange}
                            />
                            <Typography variant="h6" color="error">{formErrors.end}</Typography>
                            </Grid>                            
                        </Grid>

                        {/* <TextField fullWidth id="standard-basic" variant="standard" 
                            type="date"
                            name="start" 
                            value={formValues.start}
                            onChange={handleChange}     
                        />
                        <Typography variant="h6" color="error">{formErrors.start}</Typography> */}

                        {/* <TextField fullWidth id="standard-basic" variant="standard" 
                            type="date" 
                            name="end"  
                            value={formValues.end}
                            onChange={handleChange}     
                        />
                        <Typography variant="h6" color="error">{formErrors.end}</Typography> */}

                        <TextField fullWidth id="standard-basic" label="Note" variant="standard" 
                            type="text" 
                            name="note" 
                            value={formValues.note}
                            onChange={handleChange}      
                        />
                        <Typography variant="h6" color="error">{formErrors.note}</Typography>

                        <TextField fullWidth id="standard-basic" label="Leave Type" variant="standard" 
                            type="text" 
                            name="leaveTypeId" 
                            value={formValues.leaveTypeId}
                            onChange={handleChange}     
                        />      
                        <Typography variant="h6" color="error">{formErrors.leaveTypeId}</Typography>    
                        
                        <TextField fullWidth id="standard-basic" label="User Id" variant="standard" 
                                type="text" 
                                name="userId" 
                                value={formValues.userId}
                                onChange={handleChange}
                        />
                        <Typography variant="h6" color="error">{formErrors.userId}</Typography>
                        
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2}}
                            >
                                Submit
                        </Button>
                    </form>
                </Box>
               
                <Typography align="center">
                    <Button href="/user" variant="outlined" color="primary" sx={{ my: 1, mx: 1.5}}>
                        Return to Home
                    </Button>
                </Typography>
            </Box>     

            {/* <Link to="/user">Home</Link>
            <div className="container">     
                <Card>
                    <form onSubmit={handleSubmit}>
                        <h2>Create Leave Request</h2>
                        <div className="input-group">
                            <input 
                                type="date" 
                                name="start" 
                                placeholder="" 
                                value={formValues.start}
                                onChange={handleChange}      
                            />                            
                        </div>
                        <p className="errors">{formErrors.start}</p>

                        <div className="input-group">
                            <input 
                                type="date" 
                                name="end" 
                                placeholder="" 
                                value={formValues.end}
                                onChange={handleChange}      
                            />                            
                        </div>
                        <p className="errors">{formErrors.end}</p>

                        <div className="input-group">
                            <input 
                                type="text"
                                name="note" 
                                placeholder="Note" 
                                value={formValues.note}
                                onChange={handleChange}    
                            />                            
                        </div>
                        <p className="errors">{formErrors.note}</p>     

                         <div className="input-group">
                            <input 
                                type="text" 
                                name="leaveTypeId" 
                                placeholder="Leave type" 
                                value={formValues.leaveTypeId}
                                onChange={handleChange}      
                            />                            
                        </div>
                        <p className="errors">{formErrors.leaveTypeId}</p>                               

                        <div className="input-group">
                            <input 
                                type="text" 
                                name="userId" 
                                placeholder="User Id" 
                                value={formValues.userId}
                                onChange={handleChange}                                  
                            />   
                        </div>                        
                        <p className="errors">{formErrors.userId}</p>                     

                        <Button type="submit">Create</Button>
                    </form>    
                </Card>
            </div> */}
        </>
    )
}

export default CreateLeaveRequest

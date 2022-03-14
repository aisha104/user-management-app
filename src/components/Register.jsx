import {useState} from 'react'
// import Button from './shared/Button'
// import Card from './shared/Card'
import Swal from 'sweetalert2'
import TextField from '@mui/material/TextField'

import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

function Register() {

    const initialValue = {email:"", password:"", firstName:"", lastName:"", dateOfBirth:"", phoneNumber:"", role:"" };
    
    const [formValues, setFormValues] = useState(initialValue);

    const [formErrors, setFormErrors] = useState({});
    
    const token = localStorage.getItem('token')
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        const response = await registerUser({
            email: formValues.email,
            password: formValues.password,
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            dateOfBirth: formValues.dateOfBirth,
            phoneNumber: formValues.phoneNumber,
            role: formValues.role
        });

        if(response.status == 202)
        {
            Swal.fire({  
                text: 'User registered successfully',
                icon: 'success',
                position: 'top-end',
                timer: 1500,
                showConfirmButton: false,
            });
            setFormValues(initialValue);
        }
    } 
    
    const validate = (values) =>{
        const errors = {};

        if(!values.email) 
            { errors.email = "Email is required"; }
        
        if(!values.password) 
            { errors.password = "Password is required"; }

        if(!values.firstName) 
            { errors.firstName = "First name is required"; }

        if(!values.lastName) 
            { errors.lastName = "Last name is required"; }        

        if(!values.dateOfBirth) 
            { errors.dateOfBirth = "Date of birth is required"; }

        if(!values.phoneNumber) 
            { errors.phoneNumber = "Phone number is required"; }            
            else if(values.phoneNumber.length < 10)
                { errors.phoneNumber = "Please enter a valid phone number"; }
            else if(values.phoneNumber.length > 10)
            { errors.phoneNumber = "Please enter a valid phone number"; }       

        if(!values.role) 
            { errors.role = "Role is required"; }

        return errors;
    };

    async function registerUser (formData) {
        return  fetch("https://localhost:44324/api/Account/register", {
            method: "POST",
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
                    marginTop: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
            >
                <Typography variant="h5" color="secondary">
                    Registration Form
                </Typography>

                <Box sx={{ mt: 2, width: '75%' }}>
                    <form onSubmit={handleSubmit}>
                        <TextField fullWidth id="standard-basic" label="Email Address" variant="standard" 
                            sx={{ mb:1 }}
                            type="email"
                            name="email" 
                            value={formValues.email}
                            onChange={handleChange}     
                        />
                        <Typography variant="h6" color="error">{formErrors.email}</Typography>


                        <TextField fullWidth id="standard-basic" label="Password" variant="standard" 
                            sx={{ mb:1 }}
                            type="password" 
                            name="password"  
                            value={formValues.password}
                            onChange={handleChange}     
                        />
                        <Typography variant="h6" color="error">{formErrors.password}</Typography>

                        <TextField fullWidth id="standard-basic" label="First name" variant="standard" 
                            sx={{ mb:1 }}
                            type="text" 
                            name="firstName" 
                            value={formValues.firstName}
                            onChange={handleChange}      
                        />
                        <Typography variant="h6" color="error">{formErrors.firstName}</Typography>

                        <TextField fullWidth id="standard-basic" label="Last name" variant="standard" 
                            sx={{ mb:2 }}
                            type="text" 
                            name="lastName" 
                            value={formValues.lastName}
                            onChange={handleChange}     
                        />      
                        <Typography variant="h6" color="error">{formErrors.lastName}</Typography>    
                        
                        <TextField fullWidth id="standard-basic" label="" variant="standard" 
                            sx={{ mb:1 }}
                            type="date" 
                            name="dateOfBirth" 
                            value={formValues.dateOfBirth}
                            onChange={handleChange}
                        />
                        <Typography variant="h6" color="error">{formErrors.dateOfBirth}</Typography>

                        <TextField fullWidth id="standard-basic" label="Contact Number" variant="standard"
                            sx={{ mb:1 }} 
                            type="text" 
                            name="phoneNumber" 
                            value={formValues.phoneNumber}
                            onChange={handleChange}     
                        />
                        <Typography variant="h6" color="error">{formErrors.phoneNumber}</Typography>                
                        
                        <TextField fullWidth id="standard-basic" label="Administrator, Manager, Employee" variant="standard" 
                            type="text" 
                            name="role" 
                            value={formValues.role}
                            onChange={handleChange}     
                        />
                        <Typography variant="h6" color="error">{formErrors.role}</Typography>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2}}
                            >
                                Register
                        </Button>
                    </form>
                </Box>
               
                <Typography align="center">
                    <Button href="/admin" variant="outlined" color="primary" sx={{ my: 1, mx: 1.5}}>
                        Return to Home
                    </Button>
                </Typography>
            </Box>       
        </>
        // <>
        //     <Link to="/admin">Home</Link>
        //     <div className="container">               
                
        //         <Card>
        //             <form onSubmit={handleSubmit}>
        //                 <h2>Registration Form</h2>
        //                 <TextField fullWidth id="standard-basic" label="Email Address" variant="standard" 
        //                     type="email"
        //                     name="email" 
        //                     value={formValues.email}
        //                     onChange={handleChange}     
        //                 />
        //                 <p className="errors">{formErrors.email}</p>

        //                 <TextField fullWidth id="standard-basic" label="Password" variant="standard" 
        //                     type="password" 
        //                     name="password"  
        //                     value={formValues.password}
        //                     onChange={handleChange}     
        //                 />
        //                 <p className="errors">{formErrors.password}</p>

        //                 <TextField fullWidth id="standard-basic" label="First name" variant="standard" 
        //                     type="text" 
        //                     name="firstName" 
        //                     value={formValues.firstName}
        //                     onChange={handleChange}      
        //                 />
        //                 <p className="errors">{formErrors.firstName}</p>

        //                 <TextField fullWidth id="standard-basic" label="Last name" variant="standard" 
        //                     type="text" 
        //                     name="lastName" 
        //                     value={formValues.lastName}
        //                     onChange={handleChange}     
        //                 />                       
        //                 <p className="errors">{formErrors.lastName}</p>     
                        
        //                 <TextField fullWidth id="standard-basic" label="" variant="standard" 
        //                      type="date" 
        //                      name="dateOfBirth" 
        //                      value={formValues.dateOfBirth}
        //                      onChange={handleChange}
        //                 />
        //                 <p className="errors">{formErrors.dateOfBirth}</p>

        //                 <TextField fullWidth id="standard-basic" label="Contact Number" variant="standard" 
        //                     type="text" 
        //                     name="phoneNumber" 
        //                     value={formValues.phoneNumber}
        //                     onChange={handleChange}     
        //                 />
        //                 <p className="errors">{formErrors.phoneNumber}</p>                        
                      
        //                 <TextField fullWidth id="standard-basic" label="Administrator, Manager, Employee" variant="standard" 
        //                     type="text" 
        //                     name="role" 
        //                     value={formValues.role}
        //                     onChange={handleChange}     
        //                 />
        //                 <p className="errors">{formErrors.role}</p> 

        //                 <Button type="submit">Register</Button>
        //             </form>    
        //         </Card>
        //     </div>
        // </>
    )
}

export default Register

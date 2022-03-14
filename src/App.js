import Header from './components/Header'
import Register from './components/Register'
import Login from './components/Login'
import Homepage from './components/Homepage'
import User from './components/User'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Admin from './components/Admin'
import Manager from './components/Manager'
import CreateLeaveRequest from './components/CreateLeaveRequest'
import LeaveRequests from './components/LeaveRequests'
import LeaveRequestDetails from './components/LeaveRequestDetails'
import Footer from './components/Footer'

import { ThemeProvider } from '@mui/material/styles'
import theme from './theme.js'

function App() {   
    return (
        <>
            <ThemeProvider theme={theme}>
                <Header />   
                <Router>
                    <Routes>
                        <Route exact path='/' element={<Homepage />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/user' element={<User />} />
                        <Route path='/admin' element={<Admin />} />
                        <Route path='/manager' element={<Manager />} />
                        <Route path='/createLeaveRequest' element={<CreateLeaveRequest />} />
                        <Route path='/leaveRequests' element={<LeaveRequests />} />
                        <Route path='/leaveRequestDetails/:id' element={<LeaveRequestDetails />} />
                    </Routes>
                </Router> 
                <Footer />
            </ThemeProvider>   
        </>
    )
}

export default App

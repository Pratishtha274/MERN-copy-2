import './App.css'
import { Route,Routes } from 'react-router-dom';
import IndexPage from './pages/IndexPage.jsx';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './pages/Register.jsx';
import axios from 'axios';
import { UserContextProvider } from './UserContext.jsx';
import AccountPage from './pages/AccountPage.jsx';
import Servicepage from './pages/Servicepage.jsx';
import ServiceFormPage from './pages/ServiceFormPage.jsx';
import ServicePages from './pages/ServicePages.jsx';
import BookingsPage from './pages/BookingsPage.jsx';
import BookingPage from './pages/BookingPage.jsx';


axios.defaults.baseURL="http://localhost:4000/";
axios.defaults.withCredentials=true;
function App() {
  
  return (
    <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/account" element={<AccountPage/>}/>
        <Route path="/account/services" element={<Servicepage/>}/>
        <Route path="/account/services/new" element={<ServiceFormPage/>}/>
        <Route path="/account/services/:id" element={<ServiceFormPage/>}/>
        <Route path="/service/:id" element={<ServicePages/>}/>
        <Route path="account/bookings" element={<BookingsPage/>}/>
        <Route path="account/bookings/:id" element={<BookingPage/>}/>
      </Route>
    
    </Routes>
    </UserContextProvider>
  )
}

export default App

import {NavLink} from 'react-router-dom';
import logo from '../../Assests/logo.png'
import './Navbar.css';

function Navbar(){
    return(
        <div className='navbar'>
            <div className='logo'>
                <img src={logo} alt="logo"/>
            </div>
            
            <ul>
                <li><NavLink style={({isActive})=>{return{color:isActive?'blue':''}}} className =" navbar-link" to="/">Home</NavLink></li>
                <li><NavLink  style={({isActive})=>{return{color:isActive?'blue':''}}} className =" navbar-link" to="/blog">Blog</NavLink>  </li>
                <li><NavLink  style={({isActive})=>{return{color:isActive?'blue':''}}} className =" navbar-link" to="/login">Login</NavLink>  </li>
            </ul>
            
         </div>
    )
   
}
export default Navbar
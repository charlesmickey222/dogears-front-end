import { Link } from 'react-router-dom'
import './NavBar.css'
const NavBar = ({ user, handleLogout }) => {
  return (
    <nav>
      {user ?
        <ul>
          <li><Link to='/'>HOME</Link></li>
          <li><Link to={`/profiles/${user.name.replaceAll(' ','-')}`}>{user.name}</Link></li>
          <li><Link to='/search'>search</Link></li>
          <li><Link to="" onClick={handleLogout}>LOG OUT</Link></li>
          <li><Link to="/change-password">Change Password</Link></li>
        </ul>
      :
        <ul>
          <li><Link to="/login">Log In</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
        </ul>
      }
    </nav>
  )
}

export default NavBar

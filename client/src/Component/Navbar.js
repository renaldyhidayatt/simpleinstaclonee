import React, { useContext } from "react";
import { Link, useHistory } from 'react-router-dom';
import DarkMode from './DarkMode/DarkModeToggle';
import { UserContext } from "../App";


const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory()
  const renderList = () => {
    if(state){
      return[
        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/createpost">Posts</Link></li>,
        <li><Link to="/myfollowingpost">Following Post</Link></li>,
        <li>
          <button className="btn #c62828 red darken-3"
            onClick={() => {
              localStorage.clear()
              dispatch({type:"CLEAR"})
              history.push("/signin")
            }}>
              Logout
            </button>
        </li>
      ]
    }else{
      return[
        <li><Link to="/signin">SignIn</Link></li>,
        <li><Link to="/signup">SignUp</Link></li>,
      ]
    }
  }
  return(
    <nav>
      <div className="navbar nav-wrapper">
        <Link to="/" className="navbar-brand">Instagram</Link>
        <ul id="nav-mobile">
          {renderList()}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
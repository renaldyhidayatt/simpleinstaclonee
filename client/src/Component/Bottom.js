import React from "react";
import { Link } from "react-router-dom"


const Bottom = () => {
    return(
        <nav className="nav-mobile">
            <Link to="/" className="nav__link">
                <i className="material-icons nav__icon">home</i>
            </Link>
            <Link to="/createpost" className="nav__link nav__link--active">
                <i className="material-icons nav__icon">add_circle</i>
            </Link>
            <Link href="#" className="nav__link">
                <i className="material-icons nav__icon">settings</i>
            </Link>
            <Link to="/profile" className="nav__link">
                <i className="material-icons nav__icon">person</i>
            </Link>
      </nav>
    )
}

export default Bottom;
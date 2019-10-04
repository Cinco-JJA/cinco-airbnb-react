import React from 'react'
import api from '../api'
import { Link, NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'

function MainNavbar(props) {
  function handleLogoutClick(e) {
    api.logout()
  }
  return (
    <nav className="App-header">
      <h1 className="App-title">MERN Boilerplate</h1>
      <NavLink to="/" exact>
        Home
      </NavLink>
      <NavLink to="/listings">Listings</NavLink>
      <NavLink to="/add-listing">Add listing</NavLink>
      {!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}
      {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
      {api.isLoggedIn() && (
        <Link to="/" onClick={handleLogoutClick}>
          Logout
        </Link>
      )}
    </nav>
  )
}

export default withRouter(MainNavbar)
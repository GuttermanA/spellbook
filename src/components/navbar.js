import React from 'react';
import { NavLink } from 'react-router-dom';


const Navbar = (props) => {
  return (
  <nav className="navbar navbar-inverse">
    <a className="navbar-brand">Deck Manager</a>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <NavLink className="nav-link" to="/search">Advanced Card Search<span className="sr-only">(current)</span></NavLink>
        </li>
      </ul>
    <form className="form-inline" onSubmit={props.search}>
      <input
        className="form-control mr-sm-2"
        type="search"
        placeholder="Search Card Name"
        aria-label="Search"
      />
      <button
        className="btn btn-outline-success my-2 my-sm-0"
        type="submit"
      >
        Search
      </button>
    </form>
  </nav>
  )
}

export default Navbar

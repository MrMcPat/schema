import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import SearchBar from "./SearchBar"
import default_avatar from "./default_avatar.png"
import Dropdown from "react-bootstrap/Dropdown"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCompass } from '@fortawesome/fontawesome-free-regular'
import { faHeart } from "@fortawesome/free-solid-svg-icons"

function NavBar({ onSearch, user, setUser, setSearchedVideos }) {
  let history = useHistory()

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null)
        history.push("/")
      }
    });
  }

  return (
    <Navbar className="navbar">
      <Container>
        <div>
          <NavLink to="/" className="navbar-link text-white">
            Schema
          </NavLink>
          {user ? <NavLink to="/favorites" className="navbar-link text-white"><FontAwesomeIcon className="heart-icon" icon={faHeart} style={{ fontSize: "30px" }} /></NavLink> : null}
          <NavLink to="/explore" className="navbar-link text-white">
            <FontAwesomeIcon className="explore-icon" icon={faCompass} style={{ fontSize: "30px" }} />
          </NavLink>
        </div>
        <div>
          <SearchBar onSearch={onSearch} setSearchedVideos={setSearchedVideos} />
        </div>
        <div>
          {user ? (
            <>
              {/* span cant appear here */}
              <span className="text-white bold" >{user.username}</span>
              {
                <Dropdown className="d-inline mx-2 button-color">
                  <Dropdown.Toggle id="dropdown-autoclose-true" style={{ backgroundColor: '#2d2f32', color: "#202124", outline: "none", borderColor: "#2d2f32", borderRadius: "50%", boxShadow: "none" }}>
                    <img className="profile-picture-nav" src={user.profile_image_url ? user.profile_image_url : default_avatar} alt="profile-picture" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu >
                    <Dropdown.Item ><NavLink to="/profile" style={{ textDecoration: "none", color: "black" }}>Profile page</NavLink></Dropdown.Item>
                    <Dropdown.Item onClick={handleLogoutClick}><strong style={{ color: "red" }}>Log Out</strong></Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              }
            </>
          ) : (
            <>
              <NavLink to="/signup" className="navbar-link text-white bold">Sign Up</NavLink>
              <NavLink to="/login" className="navbar-link text-white bold">Log In</NavLink>
            </>
          )}

        </div>

      </Container>
    </Navbar >
  )
}

export default NavBar 
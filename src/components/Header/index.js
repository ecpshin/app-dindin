import "./styles.css";
import { Link } from "react-router-dom";
import Logo from "../../images/logo.svg";
import Avatar from "../../images/avatar.svg";
import Logout from "../../images/logout.svg";
import EditUser from "../Edit_User/index";
import { useState } from 'react'
import { getItem } from "../../utils/storage";
import { useNavigate } from 'react-router-dom';


function Header() {

  const [isEditVisible, setIsEditVisible] = useState(false);
  const userNome = getItem('userNome');
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate('/');
  }

  return (
    <div>
      {isEditVisible ? (
        <EditUser visible={setIsEditVisible} />
      ) : null}
      <header className="header_home dflex dflex--column">
        <div className="header_content-home dflex flex--center-evenly">
          <img src={Logo} className="header_logo dflex"
            alt="App Logo" />
          <div className="header_profile dflex dflex--row flex--center-center">
            <img src={Avatar}
              className="avatar header--img"
              alt="Profile" onClick={() => setIsEditVisible(true)} />
            <span className="header_username">{userNome}</span>
            <button className="logout" onClick={handleLogout}>
              <img src={Logout} alt="Logout" />
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;

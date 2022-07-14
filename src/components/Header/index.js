import "./styles.css";
import { Link } from "react-router-dom";
import Logo from "../../images/logo.svg";
import Avatar from "../../images/avatar.svg";
import Logout from "../../images/logout.svg";
import EditUser from "../Edit_User/index";
import { useState } from 'react'
import { getItem } from "../../utils/storage";



function Header() {

  const [isEditVisible, setIsEditVisible] = useState(false);
  const userNome = getItem('userNome');

  const handlLogout = () => {
    localStorage.clear();
  }

  return (
    <>
      {isEditVisible ? (
        <EditUser id={'editar'} />
      ) : null}
      <div className="conteiner">
        <header className="conteiner_icons">
          <img className="logo" src={Logo} alt="Dindin" />
          <img onClick={() => setIsEditVisible(true)} className="avatar" src={Avatar} width="100" alt="Dindin" />
          <span>{userNome}</span>
          <Link to="/">
            <button onClick={handlLogout}><img className="logout" src={Logout} width="100" alt="Dindin" /></button>
          </Link>
        </header>
      </div>
    </>

  );
}

export default Header;

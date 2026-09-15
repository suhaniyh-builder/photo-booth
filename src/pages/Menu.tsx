import "../menu.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import sign from "../assets/sign.png"

function Menu() {
    const navigate = useNavigate();
  return (
    <div className="menu">
      <div className="menu-logo-block">
        <img src={logo} alt="SooHani Booth" className="menu-logo" />
      </div>

      <div className="menu-title">
        <img src={sign} alt="Sign board"/>
      </div>

        <div className="menu-buttons">
        <button
          className="menu-button"
          onClick={() => navigate("/camera")}
        >
          Take photos
        </button>
      </div>
      <div className="menu-back-block">
        <button className="menu-back" onClick={() => navigate("/")}>
          <span aria-hidden="true"></span> Back
        </button>
      </div>
    </div>
  );
}

export default Menu;
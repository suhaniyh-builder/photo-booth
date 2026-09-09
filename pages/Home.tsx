import "../Home.css";
import logo from "../assets/logo.png";
import booth from "../assets/booth.png";

function Home() {
  return (
    <div className="home">
      <div className="logo-block">
        <img src={logo} alt="logo" className="logo" />
      </div>

      <div className="booth-container">
        <img src={booth} alt="Su-Hani Booth" className="booth" />
      </div>

      <button className="select-button">Select</button>
    </div>
  );
}

export default Home;
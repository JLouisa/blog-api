import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import "./styles/App.css";

function App({ isLogin, setIsLogin }) {
  return (
    <>
      <Nav isLogin={isLogin} setIsLogin={setIsLogin} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

App.propTypes = {
  isLogin: PropTypes.bool,
  setIsLogin: PropTypes.func,
};

export default App;

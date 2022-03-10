import React, { useContext, useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";

const MenuBar = () => {
  const pathName = window.location.pathname;
  const authCtx = useContext(AuthContext);
  const path = pathName === "/" ? "home" : pathName.substring(1);
  const [activeItem, setActiveItem] = useState(path);
  const handleItemClick = (e, { name }) => setActiveItem(name);
  const menuBar = authCtx.user ? (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item name={authCtx.user.name} as={Link} to="/" active>
      {authCtx.user.name}
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={authCtx.logout}
        >
          Logout
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item
        name="home"
        as={Link}
        to="/"
        active={activeItem === "home"}
        onClick={handleItemClick}
      >
        Home
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        >
          Login
        </Menu.Item>

        <Menu.Item
          name="register"
          active={activeItem === "register"}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        >
          Register
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
  return menuBar;
};

export default MenuBar;

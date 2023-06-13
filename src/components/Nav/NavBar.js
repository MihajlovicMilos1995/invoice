import React from "react";
import { useNavigate } from "react-router-dom";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <SideNav
      style={{ backgroundColor: "blue" }}
      onSelect={(selected) => {
        if (selected === "home") {
          navigate("/");
        } else if (selected === "partners") {
          navigate("/partners");
        } else if (selected === "company") {
          navigate("/company");
        }
      }}
    >
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected="home">
        <NavItem eventKey="home">
          <NavIcon>
            <i className="fa fa-fw fa-home" style={{ fontSize: "1.75em" }} />
          </NavIcon>
          <NavText>Pocetna</NavText>
        </NavItem>
        <NavItem eventKey="partners">
          <NavIcon>
            <i
              className="fa-sharp fa-solid fa-address-book"
              style={{ fontSize: "1.75em" }}
            ></i>
          </NavIcon>
          <NavText>Partneri</NavText>
        </NavItem>
        <NavItem eventKey="company">
          <NavIcon>
            <i
              className="fa-sharp fa-solid fa-address-card"
              style={{ fontSize: "1.75em" }}
            />
          </NavIcon>
          <NavText>Firme</NavText>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  );
};

export default NavBar;

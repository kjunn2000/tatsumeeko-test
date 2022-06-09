import React from "react";

import styles from "./Nav.module.css";
import useNavigation from "../../hooks/useNavigation";
import navigationData from "../../data/navigation";

import Navbar from "../Navbar";
import Tabbar from "../Tabbar";

const Nav = () => {
  const { currentRoute, setCurrentRoute } = useNavigation();

  return (
    <div className={styles.container}>
      <Navbar
        navigationData={navigationData}
        currentRoute={currentRoute}
        setCurrentRoute={setCurrentRoute}
      />
      <Tabbar
        navigationData={navigationData}
        currentRoute={currentRoute}
        setCurrentRoute={setCurrentRoute}
      />
    </div>
  );
};

export default Nav;

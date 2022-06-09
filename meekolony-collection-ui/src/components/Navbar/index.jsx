import React from "react";
import classNames from "classnames";

import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = ({ navigationData, currentRoute, setCurrentRoute }) => {
  return (
    <nav className={styles.navbar}>
      <span className="text-white text-2xl font-thin">Meekolony</span>
      <ul className={styles.navItems}>
        {navigationData.map((item, index) => (
          <Link
            to={"/meekolony-" + item.toLowerCase()}
            className={classNames([
              styles.navItem,
              currentRoute === item && styles.selectedNavItem,
            ])}
            key={index}
            onClick={() => setCurrentRoute(item)}
          >
            {item}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;

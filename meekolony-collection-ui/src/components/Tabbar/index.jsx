import React, { useCallback } from "react";
import classNames from "classnames";
import { FiUsers } from "react-icons/fi";
import { MdWork } from "react-icons/md";

import styles from "./Tabbar.module.css";
import { Link } from "react-router-dom";

const Tabbar = ({ navigationData, currentRoute, setCurrentRoute }) => {
  const getTabIcon = useCallback((item) => {
    switch (item) {
      case "Collection":
        return <FiUsers />;
      case "Holder":
        return <MdWork />;
    }
  }, []);

  return (
    <nav className={styles.tabbar}>
      {navigationData.map((item, index) => (
        <Link
          to={"/meekolony-" + item.toLowerCase()}
          key={index}
          className={classNames([
            styles.tabItem,
            currentRoute === item && styles.tabItemActive,
          ])}
          onClick={() => setCurrentRoute(item)}
        >
          <span className={styles.icon}>{getTabIcon(item)}</span>
        </Link>
      ))}
    </nav>
  );
};

export default Tabbar;

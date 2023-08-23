import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'gatsby';

import AddNotification from '../AddNotification';
import Brand from '../Brand';
import Container from '../Container';
import Config from '../../config.json';
import Drawer from '../Drawer';
import ExpandedMenu from '../ExpandedMenu';
import Icon from '../Icons/Icon';
import MiniCart from '../MiniCart';
import MobileNavigation from '../MobileNavigation';
import * as styles from './Header.module.css';
import CartContext from '../../context/CartProvider';

const Header = (prop) => {
  const [showMiniCart, setShowMiniCart] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const [menu, setMenu] = useState();
  const [activeMenu, setActiveMenu] = useState();

  const { state } = useContext(CartContext);
  const cartLength = state?.size || 0;

  const handleHover = (navObject) => {
    if (navObject.category) {
      setMenu(navObject.category);
    } else {
      setMenu(undefined);
    }
    setActiveMenu(navObject.menuLabel);
  };

  // hide menu onscroll
  useEffect(() => {
    const onScroll = () => {
      setActiveMenu(undefined);
    };
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={styles.root}>
      <Container size={'large'} spacing={'min'}>
        {/* header container */}
        <div className={styles.header}>
          <div className={styles.linkContainer}>
            <nav role={'presentation'} onMouseLeave={() => {}}>
              {Config.headerLinks.map((navObject) => (
                <Link
                  key={navObject.menuLink}
                  onMouseEnter={() => handleHover(navObject)}
                  className={`${styles.navLink} ${
                    activeMenu === navObject.menuLabel ? styles.activeLink : ''
                  }`}
                  to={navObject.menuLink}
                >
                  {navObject.menuLabel}
                </Link>
              ))}
            </nav>
          </div>
          <div
            role={'presentation'}
            onClick={() => {
              setMobileMenu(!mobileMenu);
              // setDepth(0);
            }}
            className={styles.burgerIcon}
          >
            <Icon symbol={`${mobileMenu === true ? 'cross' : 'burger'}`}></Icon>
          </div>
          <Brand />
          <div className={styles.actionContainers}>
            <button
              aria-label="Cart"
              className={`${styles.iconButton} ${styles.iconContainer} ${styles.bagIconContainer}`}
              onClick={() => {
                setShowMiniCart(true);
                setMobileMenu(false);
              }}
            >
              <Icon symbol={'bag'}></Icon>
              {cartLength > 0 ? (
                <div className={styles.bagNotification}>
                  <span>{cartLength}</span>
                </div>
              ) : null}
            </button>
            <div className={styles.notificationContainer}>
              <AddNotification openCart={() => setShowMiniCart(true)} />
            </div>
          </div>
        </div>
      </Container>

      {/* menu container */}
      <div role={'presentation'} className={`${styles.menuContainer}`}>
        <Container size={'large'} spacing={'min'}>
          <ExpandedMenu menu={menu} />
        </Container>
      </div>

      {/* minicart container */}
      <Drawer visible={showMiniCart} close={() => setShowMiniCart(false)}>
        <MiniCart />
      </Drawer>

      {/* mobile menu */}
      <div className={styles.mobileMenuContainer}>
        <Drawer
          hideCross
          top={'98px'}
          isReverse
          visible={mobileMenu}
          close={() => setMobileMenu(false)}
        >
          <MobileNavigation close={() => setMobileMenu(false)} />
        </Drawer>
      </div>
    </div>
  );
};

export default Header;

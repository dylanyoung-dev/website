import React from 'react';
import Router from 'next/router';
import Link from 'next/link';

import { classNames } from '../../utils/classNames';
import Icon from './Icon';

const Header = ({ props }) => {
    function handleWindowResize() {
        const menuOpenElm = _.get(this.menuOpenRef, 'current.offsetParent');
        if (menuOpenElm === null) {
            document.body.classList.remove('menu--opened');
        }
    }

    function handleRouteChange() {
        document.body.classList.remove('menu--opened');
    }

    function handleMenuToggle(event) {
        event.preventDefault();
        document.body.classList.toggle('menu--opened');
    }

    return (
        <header id="masthead" className="site-header dark">
            <div className="site-header-wrap">
                <div className="site-header-inside">
                    <div className="site-branding">
                        <p className="profile">
                            <Link href="/">
                                <img src="/images/dylan.jpg" className="avatar" alt="Dylan Avatar" />
                            </Link>
                        </p>
                        <div className="site-identity">
                            <p className="site-title">
                                <Link href="/">
                                    <a>Dylan Young</a>
                                </Link>
                            </p>
                            <p className="site-description">
                                Developer Advocate
                                <br />
                                Sitecore
                            </p>
                        </div>
                        <button id="menu-toggle" className="menu-toggle" onClick={handleMenuToggle}>
                            <span className="screen-reader-text">Menu</span>
                            <span className="icon-menu" aria-hidden="true" />
                        </button>
                    </div>
                    <nav id="main-navigation" className="site-navigation" aria-label="Main Navigation">
                        <div className="site-nav-wrap">
                            <div className="site-nav-inside">
                                <ul className="menu">
                                    <li className="menu-item">
                                        <Link href="/" className="">
                                            <a>Home</a>
                                        </Link>
                                    </li>
                                    {/* <li className="menu-item">
                                        <Link href="/blog" className="">
                                            <a>Blog</a>
                                        </Link>
                                    </li> */}
                                    <li className="menu-item">
                                        <Link href="/about" className="">
                                            <a>About Me</a>
                                        </Link>
                                    </li>
                                    <li className="menu-item">
                                        <Link href="/contact" className="">
                                            <a>Contact</a>
                                        </Link>
                                    </li>
                                </ul>
                                <div className="social-links">
                                    <Link href="https://dev.to/dylanyoung_dev" target="blank" className="">
                                        <a>
                                            <Icon icon="dev" />
                                            <span className="screen-reader-text">Dev to</span>
                                        </a>
                                    </Link>
                                    <Link href="https://github.com/dylanyoung-dev" target="_blank" className="">
                                        <a>
                                            <Icon icon="github" />
                                            <span className="screen-reader-text">Github</span>
                                        </a>
                                    </Link>
                                    <Link href="https://www.linkedin.com/in/dylanyoung/" target="_blank" className="">
                                        <a>
                                            <Icon icon="linkedin" />
                                            <span className="screen-reader-text">Github</span>
                                        </a>
                                    </Link>
                                    <Link href="https://twitter.com/dylanyoung_dev" target="_blank" className="">
                                        <a>
                                            <Icon icon="twitter" />
                                            <span className="screen-reader-text">Twitter</span>
                                        </a>
                                    </Link>
                                    <Link href="https://www.youtube.com/c/SitecoreMasterChannel" target="_blank" className="">
                                        <a>
                                            <Icon icon="youtube" />
                                            <span className="screen-reader-text">YouTube</span>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;

// export default class Header extends React.Component {

//     componentDidMount() {
//         window.addEventListener('resize', this.handleWindowResize, true);
//         Router.events.on('routeChangeStart', this.handleRouteChange);
//     }

//     componentWillUnmount() {
//         window.removeEventListener('resize', this.handleWindowResize, true);
//         Router.events.off('routeChangeStart', this.handleRouteChange);
//     }

// }

import React from 'react';
import Link from 'next/link';

const Footer = ({}) => {
    return (
        <footer id="colophon" className="site-footer inner-sm">
            <p className="site-info">
                <span className="copyright">Copyright 2022</span>
            </p>
            <Link id="to-top" className="to-top" href="#page">
                <a>
                    <span className="icon-arrow-up" aria-hidden="true" />
                    <span className="screen-reader-text">Back to top</span>
                </a>
            </Link>
        </footer>
    );
};

export default Footer;

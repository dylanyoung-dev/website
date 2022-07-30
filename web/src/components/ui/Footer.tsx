import React, { FC } from 'react';

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
    return (
        <footer id="colophon" className="site-footer inner-sm">
            <p className="site-info">
                <span className="copyright">Copyright 2022</span>
            </p>
        </footer>
    );
};

export default Footer;

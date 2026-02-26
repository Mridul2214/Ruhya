import React from 'react';
import '../css/Footer.css';

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <h3 className="footer-title">Ruh'ya</h3>
                    <p className="footer-tagline">Holistic Healing & Conscious Living</p>
                </div>

                <div className="footer-links">
                    <a href="#" className="footer-link">Instagram</a>
                    <a href="#" className="footer-link">Facebook</a>
                    <a href="#" className="footer-link">Email</a>
                </div>

                <div className="footer-copyright">
                    <p className="copyright-text">© 2026 Ruh'ya. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

import React from 'react';
import { Languages } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="wb-bar">
      <a className="wb-brand" href="/">
        <span className="wb-mark" aria-hidden="true">
          <Languages />
        </span>
        <span className="wb-brand-text">
          <span className="wb-brand-name">Arabic Lorem Ipsum</span>
          <span className="wb-brand-owner">Belal's tools</span>
        </span>
      </a>
      <div className="wb-bar-end">
        <span className="wb-note">v1.0.0</span>
      </div>
    </header>
  );
};

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import WalletButton from './WalletButton';

const Header: React.FC = () => {
    return (
        <header className="bg-gray-800 text-white p-4 shadow-md">
            <nav className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-teal-400">BLOKAID</Link>
                <div className="flex items-center space-x-4">
                    <Link to="/donate" className="hover:text-teal-300">Donate</Link>
                    <Link to="/my-donations" className="hover:text-teal-300">My Donations</Link>
                    <Link to="/track/1" className="hover:text-teal-300">Track</Link>
                    <WalletButton />
                </div>
            </nav>
        </header>
    );
};

export default Header;
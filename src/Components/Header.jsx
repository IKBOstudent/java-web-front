import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
    const isAuth = useSelector((state) => state.UserReducer.status) === 1;

    return (
        <header className="mx-auto px-4 bg-gray-200">
            <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                    <Link to="/">
                        <button className="p-4">MMManager</button>
                    </Link>
                    {isAuth && <button className="p-4">Recent</button>}
                </div>
                <div className="flex gap-0">
                    {isAuth ? (
                        <Link to="/">
                            <button className="p-4">Account</button>
                        </Link>
                    ) : (
                        <>
                            <Link to="/login">
                                <button className="p-4 w-24 hover:bg-slate-300 ease-in-out duration-300">
                                    Log In
                                </button>
                            </Link>
                            <Link to="/register">
                                <button className="p-4 w-24 bg-slate-900 hover:bg-slate-900/90 text-white ease-in-out duration-300">
                                    Sign Up
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;

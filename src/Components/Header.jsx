import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { user_status } from 'redux/slices/UserSlice';

const Header = () => {
    const isAuth = useSelector((state) => state.UserReducer.status) === user_status.success;

    return (
        <header className="px-4 bg-gray-200">
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
                                <button className="btn-no-fill">Log In</button>
                            </Link>
                            <Link to="/register">
                                <button className="btn-filled">Sign Up</button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;

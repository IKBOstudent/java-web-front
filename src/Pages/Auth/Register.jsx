import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../App';

const Register = () => {
    const { setIsAuth } = React.useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log('register', { email, password });
        setIsAuth(true);
        localStorage.setItem('auth', true);
        navigate('/');
    };

    return (
        <div className="max-w-[400px] mx-auto px-4 pt-[150px]">
            <div className="flex flex-col gap-6">
                <Link to="/">
                    <button className="text-sm text-gray-400 hover:underline">
                        &lt; back to Home
                    </button>
                </Link>
                <h1 className="w-full text-center text-2xl font-semibold">
                    Create MMManager account
                </h1>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        className="appearance-none border border-slate-400 p-2 focus:outline-none focus:border-slate-600"
                        placeholder="you@example.com"
                        onChange={(event) => setEmail(event.target.value)}
                        value={email}
                    />
                    <input
                        type="password"
                        className="appearance-none border border-slate-400 p-2 focus:outline-none focus:border-slate-600"
                        placeholder="Enter password"
                        onChange={(event) => setPassword(event.target.value)}
                        value={password}
                    />
                    <button
                        type="submit"
                        className="bg-slate-900 hover:bg-slate-900/90 text-white p-4">
                        Sign Up
                    </button>
                </form>
                <div className="self-center">
                    <span className="text-gray-400">Already have an account?</span>
                    <Link to="/login">
                        <button className="hover:underline ml-2">Log In</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;

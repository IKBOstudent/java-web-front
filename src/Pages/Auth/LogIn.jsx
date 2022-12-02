import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const LogIn = () => {
    const navigate = useNavigate();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log('login', { email, password });
        navigate('/');
    };

    return (
        <div className="max-w-[400px] mx-auto px-4 pt-[150px]">
            <div className="flex flex-col gap-6">
                <Link to="/">
                    <button type="button" className="text-sm text-gray-400 hover:underline">
                        &lt; back to Home
                    </button>
                </Link>
                <h1 className="w-full text-center text-2xl font-semibold">Log in to MMManager</h1>

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
                        Log In
                    </button>
                </form>
                <div className="self-center">
                    <span className="text-gray-400">Don't have an account?</span>
                    <Link to="/register">
                        <button type="button" className="hover:underline ml-2">
                            Register
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LogIn;

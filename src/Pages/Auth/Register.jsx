import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log('register', { email, password });

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
                <h1 className="w-full text-center text-2xl font-semibold">
                    Create MMManager account
                </h1>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        className="input-default"
                        placeholder="you@example.com"
                        onChange={(event) => setEmail(event.target.value)}
                        value={email}
                    />
                    <input
                        type="password"
                        className="input-default"
                        placeholder="Enter password"
                        onChange={(event) => setPassword(event.target.value)}
                        value={password}
                    />
                    <button type="submit" className="btn-filled">
                        Sign Up
                    </button>
                </form>
                <div className="self-center">
                    <span className="text-gray-400">Already have an account?</span>
                    <Link to="/login">
                        <button type="button" className="hover:underline ml-2">
                            Log In
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;

import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Account from './Pages/Main/Account';
import Board from './Pages/Main/Board';
import Header from './Components/Header';
import Home from './Pages/Home';
import LogIn from './Pages/Auth/LogIn';
import Register from './Pages/Auth/Register';
import { useDispatch, useSelector } from 'react-redux';
import { user_status, getUserById } from './redux/slices/UserSlice';

function App() {
    const dispatch = useDispatch();

    const { status } = useSelector((state) => state.UserReducer);

    React.useEffect(() => {
        dispatch(getUserById('1'));
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Header />
                            {status === user_status.loading && <h1>Loading...</h1>}
                            {status === user_status.error && <h1>Error occured :(</h1>}
                            {status === user_status.success && <Account />}
                        </>
                    }
                />
                {status === user_status.success && (
                    <Route
                        path="/board/:id"
                        element={
                            <>
                                <Header />
                                <Board />
                            </>
                        }
                    />
                )}
                {status === user_status.success && (
                    <Route path="/register" element={<Register />} />
                )}
                {status === user_status.success && <Route path="/login" element={<LogIn />} />}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

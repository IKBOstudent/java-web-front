import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Account from './Pages/Main/Account';
import Board from './Pages/Main/Board';
import Header from './Components/Header';
import Home from './Pages/Home';
import LogIn from './Pages/Auth/LogIn';
import Register from './Pages/Auth/Register';

export const AuthContext = React.createContext();

function App() {
    const [isAuth, setIsAuth] = React.useState(false);

    React.useEffect(() => {
        const localAuth = localStorage.getItem('auth');
        if (localAuth) setIsAuth(localAuth);
    }, []);

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth }}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <Header />
                                {isAuth ? <Account /> : <Home />}
                            </>
                        }
                    />
                    {isAuth && (
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
                    {!isAuth && <Route path="/register" element={<Register />} />}
                    {!isAuth && <Route path="/login" element={<LogIn />} />}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;

import React from "react";
import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import Account from "./Pages/Account";
import Board from "./Pages/Main/Board";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import LogIn from "./Pages/Auth/LogIn";
import Register from "./Pages/Auth/Register";
import { useDispatch, useSelector } from "react-redux";
import { user_status, getUserById } from "./redux/slices/UserSlice";
import Error from "Pages/Error";

function App() {
    const dispatch = useDispatch();
    const { status } = useSelector(state => state.UserReducer);

    React.useEffect(() => {
        dispatch(getUserById("1"));
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            {status === user_status.loading && (
                                <div className="fixed inset-0 w-full h-full bg-slate-600/70 z-10 flex items-center justify-center">
                                    <h1>Loading...</h1>
                                </div>
                            )}
                            <Header />
                            {status === user_status.success ? <Account /> : <Home />}
                        </>
                    }
                />
                {status === user_status.success && <Route path="/board/:id" element={<Board />} />}
                {status === user_status.error && <Route path="/register" element={<Register />} />}
                {status === user_status.error && <Route path="/login" element={<LogIn />} />}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

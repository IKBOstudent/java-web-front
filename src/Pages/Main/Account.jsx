import React from 'react';
import { Link } from 'react-router-dom';

const Account = () => {
    return (
        <div className="container mx-auto pt-10">
            <h1 className="text-3xl font-bold px-6">Your workspaces</h1>
            <div className="flex gap-4 w-full mt-4">
                <Link to="/board/1">
                    <button className="bg-slate-300 p-4 w-[12rem] h-[6rem] flex items-start">
                        <span>Board Name</span>
                    </button>
                </Link>
                <Link to="/board/2">
                    <button className="bg-slate-300 p-4 w-[12rem] h-[6rem] flex items-start">
                        <span>Board Name</span>
                    </button>
                </Link>
                <button className="bg-slate-100 p-4 w-[12rem] h-[6rem] flex items-center text-center">
                    <span>+ Create a board</span>
                </button>
            </div>
        </div>
    );
};

export default Account;

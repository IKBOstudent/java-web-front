import React from 'react';
import List from './List';

const Board = () => {
    return (
        <main className="relative w-full board bg-slate-400 px-4 min-h-full flex flex-col">
            <div className="flex justify-between items-center ">
                <div>
                    <h2 className="p-3">Board Name</h2>
                </div>
                <div className="flex gap-4 items-center">
                    <div className="p-3">Active users</div>
                    <button className="p-3">Menu Button</button>
                </div>
            </div>

            <div className="relative px-4 w-full h-full flex gap-6 items-start">
                {[1, 2, 3].map((item, id) => (
                    <List key={id} />
                ))}
                <button className="button bg-white/20 max-w-[20rem] w-full p-3">
                    + Add a list
                </button>
            </div>
        </main>
    );
};

export default Board;

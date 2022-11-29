import React from 'react';
import Card from './Card';

const List = () => {
    return (
        <div className="max-w-[20rem] w-full h-fit flex flex-col p-4 gap-4 bg-white ">
            <h3>List Name</h3>
            <div className="flex flex-col gap-4">
                {[1, 2].map((item, id) => (
                    <Card key={id} />
                ))}
            </div>
            <button className="button bg-slate-400/20 w-full p-3">+ Add a card</button>
        </div>
    );
};

export default List;

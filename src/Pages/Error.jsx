import React from 'react';

const Error = ({ status }) => {
    return (
        <div className="container mx-auto pt-10 px-6">
            <h1 className=" font-bold text-4xl">Error {status}</h1>
        </div>
    );
};

export default Error;

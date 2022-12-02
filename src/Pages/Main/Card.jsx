import React from 'react';

const Card = ({ name }) => {
    const [isOpen, setOpen] = React.useState(false);

    return (
        <>
            {isOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black/60">
                    <div className="flex max-w-[30rem] p-4 bg-slate-50 mx-auto mt-20 shadow-2xl">
                        <div className="flex justify-between w-full">
                            <h1>{name} </h1>
                            <button
                                type="button"
                                className="p-2 w-20 hover:bg-slate-300"
                                onClick={() => setOpen(false)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="p-3 bg-slate-300 h-[70px] cursor-pointer" onClick={() => setOpen(true)}>
                <span className="text-md">{name}</span>
            </div>
        </>
    );
};

export default Card;

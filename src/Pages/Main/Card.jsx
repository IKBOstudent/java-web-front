import React from "react";
import { useDispatch } from "react-redux";
import { deleteCardById } from "redux/slices/BoardSlice";

const Card = ({ item, listId }) => {
    const dispatch = useDispatch();

    const [isOpen, setOpen] = React.useState(false);

    const handleEdit = event => {};

    const handleDelete = event => {
        dispatch(deleteCardById({ listId, cardId: item.id }));
        setOpen(false);
    };

    return (
        <>
            <div className="mt-4 p-3 bg-slate-300 min-h-[70px] cursor-pointer" onClick={() => setOpen(true)}>
                <span className="text-md">{item.name}</span>
            </div>
            {isOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black/60 px-4 z-10">
                    <div className="flex flex-col gap-2 max-w-[30rem] p-4 bg-slate-50 mx-auto mt-20 shadow-2xl">
                        <div className="flex justify-between w-full">
                            <h1 className="p-2 text-lg font-semibold">{item.name} </h1>
                            <button type="button" className="btn-no-fill" onClick={() => setOpen(false)}>
                                Close
                            </button>
                        </div>
                        <div className="flex gap-4">
                            <button className="btn-no-fill bg-slate-200" onClick={handleEdit}>
                                Edit
                            </button>
                            <button className="btn-no-fill bg-slate-200" onClick={handleDelete}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Card;

import React from "react";
import MenuIcon from "Components/Icons/MenuIcon";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteBoardById } from "redux/slices/UserSlice";

const BoardCard = ({ item, userId }) => {
    const dispatch = useDispatch();
    const [boardMenuShow, setBoardMenuShow] = React.useState(false);

    const handleEdit = event => {
        event.preventDefault();
    };

    const handleDelete = event => {
        event.preventDefault();
        dispatch(deleteBoardById({ userId, boardId: item.id }));
    };

    return (
        <Link
            to={"/board/" + item.id}
            className="relative bg-slate-300 p-4 w-[12rem] h-[6rem] flex items-start justify-between"
        >
            <span className="p-1">{item.name}</span>
            <button
                className="btn-icon"
                onClick={event => {
                    event.preventDefault();
                    setBoardMenuShow(prev => !prev);
                }}
            >
                <MenuIcon width={20} />
            </button>
            {boardMenuShow && (
                <div className="border border-slate-300 bg-slate-200 absolute top-[50px] right-[-10px] flex flex-col">
                    <button className="p-2 btn-no-fill hover:bg-slate-100" onClick={handleEdit}>
                        Edit
                    </button>
                    <button className="p-2 btn-no-fill hover:bg-slate-100" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            )}
        </Link>
    );
};

export default BoardCard;

import MenuIcon from "Components/Icons/MenuIcon";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteListById, postCard } from "../../redux/slices/BoardSlice";
import Card from "./Card";

const List = ({ list }) => {
    const dispatch = useDispatch();

    const [createCardShow, setCreateCardShow] = React.useState(false);
    const [newName, setNewName] = React.useState("");

    const handleSubmitCreateCard = event => {
        event.preventDefault();

        if (newName.length > 0) {
            dispatch(postCard({ listId: list.id, cardName: newName }));
            setCreateCardShow(false);
        } else {
            console.log("invalid");
        }

        setNewName("");
    };

    const [listMenuShow, setListMenuShow] = React.useState(false);

    const handleDeleteList = () => {
        dispatch(deleteListById({ listId: list.id }));
    };

    return (
        <div className="min-w-[18rem] flex flex-col p-4 bg-white">
            <div className="relative flex justify-between">
                <h3 className="px-2 text-lg font-medium">{list?.name}</h3>
                <button
                    className="btn-icon"
                    onClick={event => {
                        event.preventDefault();
                        setListMenuShow(prev => !prev);
                    }}
                >
                    <MenuIcon width={20} />
                </button>
                {listMenuShow && (
                    <div className="border border-slate-400 bg-white absolute top-[35px] right-[-30px] flex flex-col">
                        <button className="p-2 btn-no-fill hover:bg-slate-200">Edit</button>
                        <button className="p-2 btn-no-fill hover:bg-slate-200" onClick={handleDeleteList}>
                            Delete
                        </button>
                    </div>
                )}
            </div>

            <div className="max-h-[300px] overflow-y-auto flex flex-col">
                {list?.cards?.map((item, id) => (
                    <Card key={item.id} item={item} listId={list.id} />
                ))}
            </div>

            <div className="mt-4">
                {createCardShow ? (
                    <div className="flex flex-col gap-4 p-3 w-full  bg-slate-200">
                        <form className="flex flex-col gap-2" onSubmit={handleSubmitCreateCard}>
                            <input
                                autoFocus
                                type="text"
                                placeholder="Enter card title"
                                className="appearance-none border border-slate-400 p-1 focus:outline-none focus:border-slate-600 placeholder:text-sm"
                                onChange={event => setNewName(event.target.value)}
                                value={newName}
                            />
                            <div className="flex items-center">
                                <button
                                    type="submit"
                                    className=" bg-slate-800 w-2/3 hover:bg-slate-900 text-white py-2 px-4"
                                >
                                    Create card
                                </button>
                                <button
                                    type="button"
                                    className="text-sm w-1/3 text-center text-gray-600 hover:underline"
                                    onClick={() => {
                                        setCreateCardShow(false);
                                        setNewName("");
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <button
                        type="button"
                        className="btn-no-fill w-full  hover:bg-slate-200 px-3 py-2 font-medium text-left"
                        onClick={() => setCreateCardShow(true)}
                    >
                        + Add a card
                    </button>
                )}
            </div>
        </div>
    );
};

export default List;

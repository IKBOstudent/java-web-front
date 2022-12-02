import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addBoard } from '../../redux/slices/UserSlice';

const Account = () => {
    const dispatch = useDispatch();
    const { boards } = useSelector((state) => state.UserReducer.data);

    const [isCreateBoard, setCreateBoard] = React.useState(false);
    const [newName, setNewName] = React.useState('');

    const handleSubmitCreateBoard = (event) => {
        event.preventDefault();

        if (newName.length > 0) {
            dispatch(addBoard(newName));
            setCreateBoard(false);
        } else {
            console.log('invalid');
        }
        setNewName('');
    };

    return (
        <div className="container mx-auto pt-10">
            <h1 className="text-3xl font-bold px-6">Your workspaces</h1>
            <div className="flex gap-4 w-full mt-4">
                {boards.map((item, id) => (
                    <Link to={'/board/' + item.boardId} key={item.boardId}>
                        <button
                            type="button"
                            className="bg-slate-300 p-4 w-[12rem] min-h-[6rem] flex items-start">
                            <span>{item.boardName}</span>
                        </button>
                    </Link>
                ))}

                {isCreateBoard ? (
                    <div className="flex flex-col gap-4 p-4 bg-slate-100 ">
                        <form className="flex flex-col gap-2" onSubmit={handleSubmitCreateBoard}>
                            <input
                                type="text"
                                placeholder="Enter new board name"
                                className="appearance-none border border-slate-400 p-1 focus:outline-none focus:border-slate-600 placeholder:text-sm"
                                onChange={(event) => setNewName(event.target.value)}
                                value={newName}
                            />
                            <div>
                                <button
                                    type="submit"
                                    className="bg-slate-800 hover:bg-slate-900 text-white py-2 px-4">
                                    Create board
                                </button>
                                <button
                                    type="button"
                                    className="ml-4 self-start text-sm text-gray-400 hover:underline"
                                    onClick={() => {
                                        setCreateBoard(false);
                                        setNewName('');
                                    }}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <button
                        type="button"
                        className="bg-slate-100 p-4 w-[12rem] flex items-center text-center"
                        onClick={() => setCreateBoard(true)}>
                        <span>+ Create a board</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default Account;

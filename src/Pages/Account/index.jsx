import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postBoard } from '../../redux/slices/UserSlice';
import BoardCard from './BoardCard';

const Account = () => {
    const dispatch = useDispatch();
    const { data: userData } = useSelector((state) => state.UserReducer);

    const [createBoardShow, setCreateBoardShow] = React.useState(false);
    const [newName, setNewName] = React.useState('');

    const handleSubmitCreateBoard = (event) => {
        event.preventDefault();

        if (newName.length > 0) {
            dispatch(postBoard({ userId: userData.id, boardName: newName }));
            setCreateBoardShow(false);
        } else {
            console.log('invalid');
        }
        setNewName('');
    };

    return (
        <div className="container mx-auto pt-10">
            <h1 className="text-3xl font-bold px-6">Your workspaces</h1>
            <div className="flex gap-4 w-full mt-4">
                {userData?.boards?.map((item, id) => (
                    <BoardCard key={item.boardId} item={item} userId={userData.id} />
                ))}

                {createBoardShow ? (
                    <div className="flex flex-col gap-4 p-4 bg-slate-100 ">
                        <form className="flex flex-col gap-2" onSubmit={handleSubmitCreateBoard}>
                            <input
                                autoFocus
                                type="text"
                                placeholder="Enter new board name"
                                className="input-default"
                                onChange={(event) => setNewName(event.target.value)}
                                value={newName}
                            />
                            <div>
                                <button type="submit" className="w-2/3 btn-filled">
                                    Create board
                                </button>
                                <button
                                    type="button"
                                    className="w-1/3 text-center self-start btn-underline"
                                    onClick={() => {
                                        setCreateBoardShow(false);
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
                        onClick={() => setCreateBoardShow(true)}>
                        <span>+ Create a board</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default Account;

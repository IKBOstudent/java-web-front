import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { addList, board_status, getBoardById } from 'redux/slices/BoardSlice';

import List from './List';

const Board = () => {
    const navigate = useNavigate();

    const board_id = useParams().id;

    const dispatch = useDispatch();
    const { boards } = useSelector((state) => state.UserReducer.data);

    const { data, status } = useSelector((state) => state.BoardReducer);

    React.useEffect(() => {
        const boardFound = boards.find((obj) => {
            return obj.boardId === board_id;
        });

        if (boardFound) {
            dispatch(getBoardById(board_id));
        } else {
            navigate('/');
        }
    }, [board_id]);

    console.log(data);

    const [isCreateList, setCreateList] = React.useState(false);
    const [newName, setNewName] = React.useState('');

    const handleSubmitCreateList = (event) => {
        event.preventDefault();

        if (newName.length > 0) {
            dispatch(addList(newName));
            setCreateList(false);
        } else {
            console.log('invalid');
        }

        setNewName('');
    };

    return (
        <main className="fixed h-full w-full board bg-slate-400 px-4 flex flex-col">
            {status === board_status.loading && <h1>Loading...</h1>}
            {status === board_status.error && <h1>Error occured :(</h1>}
            {status === board_status.success && (
                <>
                    <div className="flex justify-between items-center ">
                        <div>
                            <h2 className="p-3">{data?.name}</h2>
                        </div>
                        <div className="flex gap-4 items-center">
                            <div className="p-3">Active users</div>
                            <button type="button" className="p-3">
                                Menu Button
                            </button>
                        </div>
                    </div>
                    <div className="relative px-4 w-full h-full flex gap-6 items-start  flex-wrap max">
                        {data?.lists.map((item, id) => (
                            <List key={item.listId} list={item} />
                        ))}

                        {isCreateList ? (
                            <div className="flex flex-col gap-4 p-4 bg-slate-300 max-w-[15rem]">
                                <form
                                    className="flex flex-col gap-2"
                                    onSubmit={handleSubmitCreateList}>
                                    <input
                                        type="text"
                                        placeholder="Enter new list name"
                                        className="appearance-none border border-slate-400 p-1 focus:outline-none focus:border-slate-600 placeholder:text-sm"
                                        onChange={(event) => setNewName(event.target.value)}
                                        value={newName}
                                    />
                                    <div>
                                        <button
                                            type="submit"
                                            className="bg-slate-800 hover:bg-slate-900 text-white py-2 px-4">
                                            Create list
                                        </button>
                                        <button
                                            type="button"
                                            className="ml-6 self-start text-sm text-gray-600 hover:underline"
                                            onClick={() => {
                                                setCreateList(false);
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
                                className="button bg-slate-300 max-w-[15rem] w-full p-3"
                                onClick={() => setCreateList(true)}>
                                + Add a list
                            </button>
                        )}
                    </div>
                </>
            )}
        </main>
    );
};

export default Board;
